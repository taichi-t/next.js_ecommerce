import { useState } from 'react';
import { Item, Button, Icon, Header, Modal } from 'semantic-ui-react';
import useListing from '../../hooks/useListing';
import ImagesSlider from '../Slider/ImagesSlider';
import formatDateFromNow from '../../utils/formatDateFromNow';
import Link from 'next/link';
import ModalForm from '../Modal/ModalForm';
import cookie from 'js-cookie';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import CartSkeleton from '../Skeleton/CardSkeleton';

export default function AccountListing() {
  const { data: products, loading, mutate } = useListing();

  return (
    <>
      <Header as="h2">
        <Icon name="box" />
        Listing
      </Header>
      {loading ? (
        <CartSkeleton count={2} />
      ) : products.data.length ? (
        <Item.Group divided>
          {products &&
            products.data.map((p) => (
              <AccountItem {...p} key={p._id} mutate={mutate} />
            ))}
        </Item.Group>
      ) : (
        <p>There is no items you posted yet.</p>
      )}
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
  mutate,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/product`;
      const token = cookie.get('token');
      await axios.delete(url, {
        headers: {
          Authorization: token,
        },
        params: { productId: _id },
      });
      mutate();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }
  const confirm = (
    <>
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Content>
        Are you sure you want to delete <strong>"{name}"</strong>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => setOpen(false)}
          disabled={loading}
        />
        <Button
          icon="trash"
          negative
          content="Delete"
          labelPosition="right"
          loading={loading}
          onClick={handleDelete}
        />
      </Modal.Actions>
    </>
  );
  return (
    <Item>
      <Item.Image>
        <ImagesSlider medias={medias} />
      </Item.Image>
      <Item.Content>
        <Item.Header>
          <Link href={`/[id]`} as={`/${_id}`}>
            <a>{name}</a>
          </Link>
        </Item.Header>

        <Item.Meta>
          <span className="cinema">
            Posted at {formatDateFromNow(createdAt)}
          </span>
        </Item.Meta>
        <Item.Description>
          <span style={{ marginRight: '1em' }}>
            <Icon name="heart" color="pink" size="large" />
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
