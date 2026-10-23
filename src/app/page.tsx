import { ThemeToggle } from '@/components/theme/toggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='relative flex min-h-svh items-center justify-center'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <Button>Click me</Button>
    </div>
  )
}
