import pool from "../../db.js"
import bcrypt from "bcrypt"
import { addUserQuery, findUserByEmailQuery, changePasswordQuery } from "./queries.js"
import jwt from "jsonwebtoken"

export const signin = (req, res) => {
  const { email, password } = req.body

  pool.query(findUserByEmailQuery, [email], (error, response) => {
    if (!response.rows[0] || error) {
      res.status(404).send("لا يوجد حساب يستخدم هذا البريد الإلكتروني.")
      return
    }
    const user = response.rows[0]

    const match = bcrypt.compareSync(password, user.password)

    if (!match) {
      res.status(403).send("كلمة المرور خاطئة.")
      return
    }

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.status(200).send({ token: token })
  })
}

export const signup = (req, res) => {
  const { email, password, firstName, lastName } = req.body
  const passhash = bcrypt.hashSync(password, 10)

  const token = jwt.sign(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  )

  pool.query(addUserQuery, [firstName, lastName, email, passhash], (error) => {
    if (error) {
      res.status(400).send({ error: "البريد الإلكتروني مستخدم مسبقاً." })
    } else {
      res.status(200).send({ token: token })
    }
  })
}

export const changePassword = (req, res) => {
  const { email, password, newPassword } = req.body
  const passhash = bcrypt.hashSync(newPassword, 10)

  pool.query(findUserByEmailQuery, [email], (error, response) => {
    if (!response.rows[0] || error) {
      res.status(404).send("حصل خطأ ما, أعد تسجيل الدخول.")
      return
    }

    const user = response.rows[0]

    const match = bcrypt.compareSync(password, user.password)

    if (!match) {
      res.status(403).send( "كلمة المرور القديمة خاطئة.")
      return
    }

    pool.query(changePasswordQuery, [email, passhash], (error) => {
      if (error) {
        res.status(400).send({ error: "حصل خطأ ما, أعد المحاولة." })
      } else {
        res.status(200).send("تم تغيير كلمة المرور.")
      }
    })
  })
}
