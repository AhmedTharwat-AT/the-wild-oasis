import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open modalName="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window modalName="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
