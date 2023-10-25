'use client'
import React, { useRef } from 'react'
import { trpc } from '../_trpc/client'

export const AddTodo = () => {
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const getTodos = trpc.getTodos.useQuery()
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch()
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (titleRef.current && descriptionRef.current) {
      addTodo.mutate({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      })
      titleRef.current.value = ''
      descriptionRef.current.value = ''
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-80 text-stone-800 mt-10'>
        <input ref={titleRef} type="text" placeholder="title" className='w-full rounded-sm px-4 py-2 my-2' />
        <textarea ref={descriptionRef} placeholder="description" className='w-full rounded-sm px-4 py-2 my-2' />
        <button type='submit' className='px-4 py-2 bg-blue-200 rounded-sm drop-shadow-sm text-blue-800'>Add Todo</button>
      </form>
    </>
  )
}
