import { useState } from "react";
import { Button } from "@/ui/components/base/buttons/button";
import { Input } from "@/ui/components/base/input/input";
import { useJoinSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";


export default function JoinPage() {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [sessionCode, setSessionCode] = useState("");

  const { mutate: joinSession } = useJoinSession();

  const onClick = () => {
    const code = parseInt(sessionCode);
    joinSession({ code, name: uname }, {
      onSuccess() {
        navigate("/lobby");
      },
      onError(error) {
        console.error("error", error);
      }
    });
  };

  return (
    <main className="section-container my-24 flex flex-col">
      <Input label="Имя" onChange={setUname} />
      <Input label="Сессия" onChange={setSessionCode} />
      <Button onClick={onClick}>Join</Button>
    </main>
  );
}
