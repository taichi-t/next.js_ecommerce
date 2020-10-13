// import moduleName from ''
import { useState } from 'react';
import { Item, Label, Button, Icon } from 'semantic-ui-react';
import ImagesSlider from '../Slider/ImagesSlider';
import { useRouter } from 'next/router';
import catchErrors from '../../utils/catchErrors';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import ModalForm from '../Modal/ModalForm';
import Profile from '../Profile/Profile';

function ProductSummary({ user, product }) {
  const { name, medias, _id, price, sku } = product;
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(product.wantCounter);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAddProductToSavedItems = async () => {
    const isUser = Object.keys(user).length;
    if (!isUser) {
      return router.push('/signup');
    }
    try {
      setLoading(true);
      const url = `${baseUrl}/api/saved`;
      const payload = { productId: _id };
      const token = cookie.get('token');
      const headers = { headers: { Authorization: token } };
      const response = await axios.put(url, payload, headers);
      if (response.status == 200) {
        setCounter((prevCounter) => prevCounter + 1);
        setMessage('The item is successfully added');
        // mutate({ ...product, wantCounter: product.wantCounter + 1 });
      } else if (response.status == 204) {
        setMessage('The item is already added.');
      }
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Item.Group>
      <Item>
        <Item.Image className="maxHeight100">
          <ImagesSlider medias={medias} />
        </Item.Image>
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
          </Item.Description>

          <Item.Extra>
            <Button as="div" labelPosition="right">
              <Button
                color="red"
                onClick={handleAddProductToSavedItems}
                loading={loading}
              >
                <Icon name="heart" />
                want
              </Button>
              <Label as="a" basic color="red" pointing="left">
                {counter}
              </Label>
            </Button>
          </Item.Extra>
          {message && (
            <Label basic color="red" pointing size="small">
              {message}
            </Label>
          )}

          <Item.Extra>
            <ModalForm
              trigger={
                Object.keys(user).length ? (
                  <Label
                    as="a"
                    content={product.user.name}
                    image={{
                      src: product.user.profilePicture.url,
                      spaced: 'right',
                      avatar: true,
                    }}
                  />
                ) : (
                  <span />
                )
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
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
