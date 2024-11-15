import { PrismaClient } from "@prisma/client";
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
      },
    });
    if (study.password === pw) {
      res.locals.study = study;
      next();
    } else
      res.status(204).send({
        msg: "인증 실패",
        auth: false,
      });
  } catch (err) {
    console.error(err);
  }
}
