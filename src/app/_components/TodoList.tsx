'use client'
import React from 'react'
import { trpc } from '../_trpc/client'

export const TodoList = () => {
  const allTodos = trpc.getTodos.useQuery()
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      allTodos.refetch()
    }
  })

  const handleDelete = (id: number) => {
    deleteTodo.mutate({ id: id })
  }

  return (
    <div className='grid gap-y-2'>
      {allTodos.data?.map((todo) => (
        <div key={todo.id} className=' bg-white/10 rounded-lg px-8 py-4 flex items-start justify-between'>
          <div className=''>{todo.title}</div>
          <div className=''>{todo.description}</div>
          <div className='text-xs'> {todo.createdAt}</div>
          <button onClick={() => handleDelete(todo.id)} className='px-4 py-2 bg-red-300 text-red-800 rounded-sm drop-shadow-md'>Delete</button>
        </div>
      ))}
    </div>
  )
}
