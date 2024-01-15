import { NextApiRequest, NextApiResponse } from 'next'
import { TodoType } from '../../types/todo'
import { readFile } from 'fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  {
    if (req.method === 'GET') {
      try {
        const todos = await new Promise<TodoType[]>((resolve, reject) => {
          readFile('data/todos.json', (err, data) => {
            if (err) {
              return reject(err.message)
            }
            const todosData = data.toString()
            if (!todosData) {
              return resolve([])
            }
            const todos = JSON.parse(data.toString())
            return resolve(todos)
          })
        })
        res.statusCode = 200
        return res.send(todos)
      } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.send(e)
      }
    }

    res.statusCode = 405
    console.log(res.statusCode)
    return res.end
  }
}
