import { useState } from "react";
import { Button } from "@/ui/components/base/buttons/button";
import { Input } from "@/ui/components/base/input/input";
import { useCreateSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";


export default function CreatePage() {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");

  const { mutate: createSession } = useCreateSession();

  const onClick = () => {
    createSession({ name: uname }, {
      onSuccess() {
        navigate("/lobby");
      },
      onError(error) {
        console.error("error", error);
      },
    });
  };

  return (
    <main className="section-container my-24 flex flex-col">
      <Input label="Имя" onChange={setUname} />
      <Button onClick={onClick}>Create</Button>
    </main>
  );
}
