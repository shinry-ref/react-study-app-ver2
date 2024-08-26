import { FC, memo, useState } from "react";
import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { addStudyRecord, getAllStudyRecords } from "../../utils/supabaseFunction";
import { Record } from "../../domain/record";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setRecords: (records: Record[]) => void;
}

type FormData = {
  title: string;
  time: string;
};

export const SubmitModal:FC<Props> = memo((props) => {
  const { isOpen, onClose, setRecords } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeTime = (event:  React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value);

  const onSubmit = async () => {

    // if (detail == "" || time == 0) return setErrorFlag(true);

    await addStudyRecord(title, time);
    const newRecords = await getAllStudyRecords();
    setRecords(newRecords);

    setTitle('');
    setTime('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent pb={2}>
      <ModalHeader>ユーザー詳細</ModalHeader>
      <ModalCloseButton />
      <ModalBody mx={4}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>学習記録</FormLabel>
            <Input 
              {...register("title", {
                required: "内容の入力は必須です",
                onChange: onChangeTitle
            })} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.time}>
            <FormLabel>学習時間</FormLabel>
            <Input
            type="number"
            {...register("time", {
              required: "時間の入力は必須です",
              onChange: onChangeTime,
              min: {
                value: 0,
                message: "時間は0以上である必要があります",
              },
            })} />
            <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup variant='outline' spacing='6'>
          <Button type={"submit"} colorScheme='teal' onClick={handleSubmit(onSubmit)}>登録</Button>
          <Button onClick={onClose}>キャンセル</Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
})