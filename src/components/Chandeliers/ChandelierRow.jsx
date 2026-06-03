import Chandelier from './Chandelier'

export default function ChandelierRow() {
  const positions = [
    [0, 6.3, 10],
    [0, 6.3, 3],
    [0, 6.3, -4],
    [0, 6.3, -11],
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <Chandelier key={i} position={pos} />
      ))}
    </>
  )
}
