import React, { useState } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';
import ImagesSlider from '../../components/Slider/ImagesSlider';
import ModalForm from '../Modal/ModalForm';
import Profile from '../Profile/Profile';
import Link from 'next/link';

function SavedItem({ product, handleRemoveFromSaved }) {
  const [open, setOpen] = useState(false);

  return (
    <Item>
      <Item.Image>
        <ImagesSlider medias={product.medias} />
      </Item.Image>
      <Item.Content>
        <Item.Header>
          <Link href={`/[id]`} as={`/${product._id}`}>
            <a>{product.name}</a>
          </Link>
        </Item.Header>

        <Item.Meta>
          <span className="price">${product.price}</span>
        </Item.Meta>
        <Item.Description>{product.description}</Item.Description>
        <Item.Extra>
          <ModalForm
            trigger={
              <Label
                as="a"
                content={product.user.name}
                image={{
                  src: product.user.profilePicture.url,
                  spaced: 'right',
                  avatar: true,
                }}
              />
            }
            component={
              <Profile
                setOpen={setOpen}
                seller={product.user}
                product={product}
              />
            }
            setOpen={setOpen}
            open={open}
          />

          <Button
            basic
            compact
            icon="remove"
            floated="right"
            onClick={() => handleRemoveFromSaved(product._id)}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default SavedItem;
