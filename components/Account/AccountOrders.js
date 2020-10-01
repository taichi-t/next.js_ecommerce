import React, { useContext } from 'react';
import {
  Header,
  Accordion,
  Label,
  Segment,
  Icon,
  Button,
  List,
  Image,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import formatDate from '../../utils/formatDate';
import useOrders from '../../hooks/useOrders';

function AccountOrders() {
  const { orders } = useOrders();
  console.log(orders);
  const router = useRouter();
  function mapOrdersToPanels(orders) {
    return (
      orders &&
      orders.map((order) => ({
        key: order._id,
        title: {
          content: <Label color="blue" content={formatDate(order.createdAt)} />,
        },
        content: {
          content: (
            <>
              <List.Header as="h3">
                Total: ${order.total}
                <Label
                  content={order.email}
                  icon="mail"
                  basic
                  horizontal
                  style={{ marginLeft: '1em' }}
                />
              </List.Header>
              <List>
                {order.products.map((p) => (
                  <List.Item key={p.product._id}>
                    <Image size="small" src={p.product.mediaUrls[0]} />
                    <List.Content>
                      <List.Header>{p.product.name}</List.Header>
                      <List.Description>
                        {p.quantity} ・ ${p.product.price}
                      </List.Description>
                    </List.Content>
                    <List.Content floated="right">
                      <Label tag color="red" size="tiny">
                        {p.product.sku}
                      </Label>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </>
          ),
        },
      }))
    );
  }

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment inverted color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No past orders.
          </Header>
          <div>
            <Button onClick={() => router.push('/')} color="orange">
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  );
}

export default AccountOrders;
