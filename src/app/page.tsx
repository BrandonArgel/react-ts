import { Card } from '@/components/examples/Card'
import { Select } from '@/components/examples/Select'

export default function Home() {
  return (
    <>
      <main>
        <h1>Select</h1>
        <Select>
          <Select.Item label="Option 1" />
          <Select.Item label="Option 2" />
        </Select>
        <h2>Card</h2>
        <Card>
          <Card.Header title="Mi Proyecto" />
          <Card.Body>
            <p>Este es un ejemplo de componentes en espacio de nombres.</p>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}
