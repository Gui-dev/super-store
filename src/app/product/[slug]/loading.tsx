import { Loader2Icon } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2Icon size={24} className="animate-spin text-primary" />
    </div>
  )
}

export default Loading
