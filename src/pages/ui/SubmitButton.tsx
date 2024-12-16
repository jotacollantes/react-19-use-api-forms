import { useFormStatus } from 'react-dom'

export const SubmitButton = () => {
    //useFormStatus() no necesit aargumentos, solamente que dea un descendiente de un formulario  o sea su componente padre sea un <Form>
    const status =useFormStatus()
    //console.log(status)
  return (
    <button type="submit" className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded flex-1 sm:flex-none" disabled={status.pending}>
        Agregar planeta
      </button>
  )
}
