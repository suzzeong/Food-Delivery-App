import React, {useCallback} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Order} from '../slices/order';
import {RootState} from '../store/reducer';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const toggleDetail = useCallback(() => {}, []);

  const renderItem = useCallback(({item}: {item: Order}) => {
    return (
      <View style={styles.orderContainer}>
        <Pressable onPress={toggleDetail} style={styles.info}>
          <Text style={styles.eachInfo}>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </Pressable>
      </View>
    );
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.orderId}
      renderItem={renderItem}>
      {orders.map(item => (
        <View style={styles.orderContainer}>
          <Pressable onPress={toggleDetail} style={styles.info}>
            <Text style={styles.eachInfo}>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </Text>
          </Pressable>
        </View>
      ))}
    </FlatList>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
  },
  eachInfo: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Orders;
