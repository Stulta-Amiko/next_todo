import React from 'react'
import Axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'

import TodoList from '../components/TodoList'
import { TodoType } from '../types/todo'
import { getTodosAPI } from '../lib/api/todo'

interface IProps {
  todos: TodoType[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI()
    console.log(data)
    return { props: { todos: data } }
  } catch (e) {
    console.log(e)
    return { props: { todos: [] } }
  }
}

const app: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos} />
}

export default app
