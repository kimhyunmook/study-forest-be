import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
export default async function auth(req, res, next) {
  const { id, pw } = req.body;

  try {
    const study = await prisma.study.findUnique({
      where: {
        id,
      },
      include: {
        emojis: true,
        habit: true,
        authKey: true,
      },
    });

    if (!!study.authKey[0]) return next();
    if (study.password !== pw) return res.send({ auth: false, t:'no pw' });
    await prisma.authKey.create({
      data: {
        studyId: study.id,
        value: uuidv4(),
      },
    });

    return next();
  } catch (err) {
    console.error("err", err);
  }
}
