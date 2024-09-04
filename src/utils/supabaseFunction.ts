import { Record } from "../domain/record";
import { supabase } from "./supabase";

export const getAllStudyRecords = async (): Promise<Record[]> => {
  const response = await supabase.from("study-record-ver2").select('*').order('id', { ascending: true });;
  if (response.error){
    throw new Error(response.error.message);
  }

  const recordsData = response.data.map((record) => {
    return Record.newRecord(record.id, record.title, record.time, record.created_at)
  }) 

  return recordsData;
}

export const addStudyRecord = async (title: string, time: number | undefined) => {
  await supabase
  .from('study-record-ver2')
  .insert({ title: title, time: time  })
}

export const deleteStudyRecord = async (id: number) => {
  await supabase
  .from('study-record-ver2')
  .delete()
  .eq('id', id)
}

export const updateStudyRecord = async (id: number, title: string, time: number) => {
  await supabase
  .from('study-record-ver2')
  .update({ title: title, time: time })
  .eq('id', id)
}