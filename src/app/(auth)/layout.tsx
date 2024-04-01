export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen gap-5'>
      {children}
    </div>
  )
}
