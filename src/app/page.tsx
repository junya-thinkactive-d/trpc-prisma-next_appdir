import Image from 'next/image'
import { TodoList } from './_components/TodoList'
import { AddTodo } from './_components/AddTodo'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-blue-900 text-white pt-24">
      <div className='text-4xl font-bold my-12'>TodoList</div>
      <div className='max-w-6xl w-full  mx-auto'>
        <TodoList />
      </div>
      <AddTodo />
    </main>
  )
}
