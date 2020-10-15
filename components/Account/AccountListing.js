import { useState } from 'react';
import { Item, Button, Icon, Header, Modal } from 'semantic-ui-react';
import useListing from '../../hooks/useListing';
import ImagesSlider from '../Slider/ImagesSlider';
import formatDateFromNow from '../../utils/formatDateFromNow';
import Link from 'next/link';
import ModalForm from '../Modal/ModalForm';

export default function AccountListing() {
  const { data: products, loading } = useListing();

  return (
    <>
      <Header as="h2">
        <Icon name="box" />
        Listing
      </Header>
      <Item.Group divided>
        {products && products.data.map((p) => <AccountItem {...p} />)}
      </Item.Group>
    </>
  );
}

const AccountItem = ({
  commentCounter,
  name,
  _id,
  wantCounter,
  medias,
  createdAt,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirm = (
    <>
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Content>
        Are you sure you want to delte <strong>"{name}"</strong>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={() => setOpen(false)} />
        <Button icon="trash" negative content="Delete" labelPosition="right" />
      </Modal.Actions>
    </>
  );
  return (
    <Item>
      <Item.Image className="maxHeight100">
        <ImagesSlider medias={medias} />
      </Item.Image>
      <Item.Content>
        <Item.Header as="a">
          <Link href={`/[id]`} as={`/${_id}`}>
            {name}
          </Link>
        </Item.Header>

        <Item.Meta>
          <span className="cinema">
            Posted at {formatDateFromNow(createdAt)}
          </span>
        </Item.Meta>
        <Item.Description>
          <span style={{ marginRight: '1em' }}>
            <Icon name="heart" color="red" size="large" />
            {wantCounter}
          </span>
          <span>
            <Icon name="comment" size="large" />
            {commentCounter}
          </span>
        </Item.Description>
        <Item.Extra>
          <ModalForm
            trigger={
              <Button
                icon="trash alternate outline"
                color="red"
                content="Delete Product"
                floated="right"
              />
            }
            setOpen={setOpen}
            open={open}
            component={confirm}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
