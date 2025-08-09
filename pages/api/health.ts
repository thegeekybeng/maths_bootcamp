import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.$queryRaw`SELECT 1` // simple connectivity check
    res.status(200).json({ ok: true, db: 'ok' })
  } catch (e: any) {
    res.status(500).json({ ok: false, db: 'error', message: e?.message })
  }
}
