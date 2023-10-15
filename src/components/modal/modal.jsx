function Modal({content, states}) {
    return (
        <Sheet isOpen={states.isOpenModal} onClose={() => states.setIsOpenModal(false)}
        snapPoints={[667, 400, 130, 0]}
        initialSnap={2}
        onSnap={snapIndex => snapIndex == 3 ? states.setIsOpenModal(true) : 0}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              {content}
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
    );
}

export default Modal;