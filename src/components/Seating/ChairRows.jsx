import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function ChairRows() {
  const meshRef = useRef()

  const { matrices, count } = useMemo(() => {
    const matrices = []
    const dummy = new THREE.Object3D()

    const rowCount = 10
    const colCount = 10
    const rowStep = 0.7
    const colStep = 0.55
    const zStart = 12

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        // Left block
        dummy.position.set(-1.5 - c * colStep, 0, zStart - r * rowStep)
        dummy.rotation.y = 0
        dummy.updateMatrix()
        matrices.push(dummy.matrix.clone())

        // Right block
        dummy.position.set(1.5 + c * colStep, 0, zStart - r * rowStep)
        dummy.rotation.y = 0
        dummy.updateMatrix()
        matrices.push(dummy.matrix.clone())
      }
    }

    return { matrices, count: matrices.length }
  }, [])

  useEffect(() => {
    if (!meshRef.current) return
    matrices.forEach((m, i) => meshRef.current.setMatrixAt(i, m))
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [matrices])

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow receiveShadow>
      <boxGeometry args={[0.45, 0.9, 0.45]} />
      <meshStandardMaterial color="#FAFAFA" roughness={0.7} />
    </instancedMesh>
  )
}
