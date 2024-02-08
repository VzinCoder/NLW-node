import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function voteOnPoll(app: FastifyInstance) {

    app.post('/polls/:pollId/votes', async (request, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        })

        const { pollOptionId } = voteOnPollBody.parse(request.body)
        const { pollId } = voteOnPollParams.parse(request.params)


        let { sessionId } = request.cookies

        if (sessionId) {
            const userPreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })

            const isVoted = userPreviousVoteOnPoll
            const votedOption = userPreviousVoteOnPoll?.pollOptionId
            const isVotedOtherOption = votedOption != pollOptionId

            if (isVoted && isVotedOtherOption) {

                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnPoll?.id
                    }
                })

            } else if (isVoted) {
                return reply
                .status(400)
                .send('You already voted on this poll.')
            }
        }

        if (!sessionId) {
            sessionId = randomUUID()

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            })
        }

        await prisma.vote.create({
            data: {
                sessionId,
                pollOptionId,
                pollId
            }
        })

        return reply.status(201).send()

    })
}