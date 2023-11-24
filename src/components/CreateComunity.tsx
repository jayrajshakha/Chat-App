import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  COLLECTION_ID,
  DATABASE,
  DATABASE_ID,
  ID,
} from "../config/AppwriteConfig";
import { AppwriteException } from "appwrite";
import { CommunityStore } from "../data/CommunityData";

export default function CreateCommunity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const communityState = CommunityStore();

  const [community, setCommunity] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerSubmit = () => {
    setLoading(true);

    const database = DATABASE.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        name: community,
      }
    );

    database
      .then((res) => {
        setLoading(false);
        communityState.AddCommunity(res);
        toast.success("You created succesfully new community");
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        toast.error(err.message, { theme: "colored" });
      });

    setCommunity("");
  };

  return (
    <>
      <button
        className="bg-green-400 hidden sm:inline-block text text-sm sm:text-base sm:w-26 rounded p-2"
        onClick={onOpen}
      >
        Add Community
      </button>
      <button
        onClick={onOpen}
        className=" sm:hidden text-xs p-2 bg-blue-300 m-2 rounded"
      >
        Add
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                Creating New Community
              </ModalHeader>
              <ModalBody>
                <p>
                  Create a Communities in you intrested topics and add your
                  friends in Your Community.
                </p>
                <Input
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  type="text"
                  label={"Create Community"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={handlerSubmit}
                  onPress={onClose}
                  disabled={community === ""}
                >
                  {loading ? <Spinner></Spinner> : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
