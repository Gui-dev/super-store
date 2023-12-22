export const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className="bg-accent px-4 py-4">
      <h1 className="text-center text-lg font-bold">Super Store©️ {date}</h1>
      <p className="text-center text-xs text-gray-500">Todos os direitos reservados</p>
    </footer>
  )
}
