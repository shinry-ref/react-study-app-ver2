import { Record } from "../domain/record";
import { supabase } from "./supabase";

export const getAllStudyRecords = async (): Promise<Record[]> => {
  const response = await supabase.from("study-record-ver2").select('*');
  if (response.error){
    throw new Error(response.error.message);
  }

  const recordsData = response.data.map((record) => {
    return new Record(record.id, record.title, record.time)
  }) 

  return recordsData;
}

export const addStudyRecord = async (detail, time) => {
  await supabase
  .from('study-record')
  .insert({ title: detail, time: time  })
}

export const deleteStudyRecord = async (id) => {
  await supabase
  .from('study-record')
  .delete()
  .eq('id', id)
}