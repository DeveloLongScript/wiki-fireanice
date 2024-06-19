import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GeistSans } from "geist/font/sans";
import { FormEvent, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Cease() {
  const [dialog, setDialog] = useState(false);
  const [url, setURL] = useState("");
  const [auth, setAuth] = useState("");
  const [why, setWhy] = useState("");
  const [finished, setFinished] = useState(false);

  return (
    <main>
      <Alert className="w-full">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Please don{"'"}t spam this form.</AlertTitle>
        <AlertDescription>
          This form has been ratelimited, but its annoying to see fake ceases.
          Please only cease if you are High Rank+, and actually have a
          complaint.
        </AlertDescription>
      </Alert>
      <br />
      {finished && (
        <Alert>
          <AlertTitle>Finished!</AlertTitle>
          <AlertDescription>
            Your cease has been sent. A verification of your authority will be
            checked in the offical FireAnIceBox Discord server.
          </AlertDescription>
        </Alert>
      )}
      <br />
      <h1>Cease</h1>
      Cease is a measure to make sure all information, can be shown to all
      people, staff or not. This may have been because the information was
      unclear if it was sensitive or not. If you think the information that is
      shown is too sensitive for the public to know,{" "}
      <strong>along with being HR+ (high rank or higher) on FireAnIce</strong>,
      you can cease. This will make the requested page get removed after proper
      verification.
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Discord Username"
          name="auth"
          onChange={(event) => setAuth(event.target.value)}
          disabled={finished}
        />
        <small>
          This will be confirmed to make sure you have the proper authority.
        </small>
        <br />
        <br />
        <Input
          type="text"
          placeholder="URL of page to cease"
          name="url"
          disabled={finished}
          onChange={(event) => setURL(event.target.value)}
        />
        <br />
        <Textarea
          name="why"
          disabled={finished}
          placeholder="What information is sensitive/Why does it need to be removed"
          onChange={(event) => setWhy(event.target.value)}
        />
        <br />
        <Button>Submit</Button>
      </form>
      <AlertDialog open={dialog} onOpenChange={setDialog}>
        <AlertDialogContent className={GeistSans.className}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              There was a problem while sending your request
            </AlertDialogTitle>
            <AlertDialogDescription>
              Something went wrong while sending your request.
              <br />
              <small>
                Hint: it was mostly likely because you got ratelimited
              </small>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/requestACease", {
      method: "POST",
      body: JSON.stringify({ why: why, url: url, auth: auth }),
    });
    if (!response.ok) setDialog(true);
    else setFinished(true);
  }
}
