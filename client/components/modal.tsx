'use client'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export function Modal({ children, showModal, setShowModal }: Props) {
  const desktopModalRef = useRef(null)

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    },
    [setShowModal],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <>
      {showModal && (
        <div>
          <div
            ref={desktopModalRef}
            key="desktop-modal"
            className="fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex"
            onMouseDown={(e) => {
              if (desktopModalRef.current === e.target) {
                setShowModal(false)
              }
            }}
          >
            <div className="overflow relative w-full max-w-lg transform rounded-xl border border-gray-200 bg-white p-6 text-left shadow-2xl transition-all">{children}</div>
          </div>

          <div
            key="desktop-backdrop"
            className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}
    </>
  )
}
