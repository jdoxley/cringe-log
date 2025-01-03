"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

export default function Content({ id }: { id: string }) {
  const [user] = api.profile.getById.useSuspenseQuery({ id });
  const mutation = api.profile.update.useMutation();
  const [array1, setArray1] = useState<string[]>(user?.submit_messages ?? []);
  const [array2, setArray2] = useState<string[]>(user?.view_messages ?? []);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const addNumber = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setArray([...array, input]);
    setInput("");
  };

  const removeNumber = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const editNumber = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    newValue: string,
  ) => {
    const newArray = [...array];
    newArray[index] = newValue;
    setArray(newArray);
  };

  const save = () => {
    console.log(array1);
    user!.submit_messages = array1;
    user!.view_messages = array2;
    console.log(user);
    const u = mutation.mutate(user!);
  };

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto p-5 pb-10 text-xl">{user?.name}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ArrayEditor
          array={array1}
          setArray={setArray1}
          input={input1}
          setInput={setInput1}
          addNumber={addNumber}
          removeNumber={removeNumber}
          editNumber={editNumber}
          title="Submit Messages For"
        />
        <ArrayEditor
          array={array2}
          setArray={setArray2}
          input={input2}
          setInput={setInput2}
          addNumber={addNumber}
          removeNumber={removeNumber}
          editNumber={editNumber}
          title="View Messages For"
        />
      </div>
      <Button
        onClick={() => {
          save();
        }}
        className="mx-auto mt-10"
      >
        Save
      </Button>
    </div>
  );
}

interface ArrayEditorProps {
  array: string[];
  setArray: React.Dispatch<React.SetStateAction<string[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  addNumber: (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  removeNumber: (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => void;
  editNumber: (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    newValue: string,
  ) => void;
  title: string;
}

function ArrayEditor({
  array,
  setArray,
  input,
  setInput,
  addNumber,
  removeNumber,
  editNumber,
  title,
}: ArrayEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex">
          <Input
            type="string"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a number"
            className="mr-2"
          />
          <Button onClick={() => addNumber(array, setArray, input, setInput)}>
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {array.map((num, index) => (
            <li key={index} className="flex items-center">
              <Input
                type="string"
                value={num}
                onChange={(e) =>
                  editNumber(array, setArray, index, e.target.value)
                }
                className="mr-2"
              />
              <Button
                variant="destructive"
                onClick={() => removeNumber(array, setArray, index)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
