import React, { useState } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import ImagesSlider from '../../components/Slider/ImagesSlider';
import ModalForm from '../Modal/ModalForm';
import Profile from '../Profile/Profile';

function SavedItem({ product, handleRemoveFromSaved }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Item key={product._id}>
      <Item.Image>
        <ImagesSlider imageUrls={product.mediaUrls} />
      </Item.Image>
      <Item.Content>
        <Item.Header as="a" onClick={() => router.push(`/${product._id}`)}>
          {product.name}
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
                  src: product.user.profilePictureUrl,
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
