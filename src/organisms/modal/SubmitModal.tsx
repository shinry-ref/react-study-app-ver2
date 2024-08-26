import { FC, memo } from "react";
import { Button, ButtonGroup, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitModal:FC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent pb={2}>
      <ModalHeader>ユーザー詳細</ModalHeader>
      <ModalCloseButton />
      <ModalBody mx={4}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>学習記録</FormLabel>
            <Input/>
          </FormControl>
          <FormControl>
            <FormLabel>学習時間</FormLabel>
            <Input/>
          </FormControl>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup variant='outline' spacing='6'>
          <Button colorScheme='teal'>登録</Button>
          <Button>キャンセル</Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
})