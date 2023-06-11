import React, { useEffect, useState } from 'react';

const OngoingOrders = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const url = 'https://spare-parts-php.herokuapp.com/ongoing_orders.php';

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { total_orders, ongoing_orders } = responseData;

        setData((prevData) => [...prevData, ...ongoing_orders]);
        setHasMore(ongoing_orders.length > 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }

    setIsLoading(false);
  };

  const loadMoreOrders = () => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <div className="Total_Orders">
        <h2>Total Orders: {data.length}</h2>
      </div>

      {data.length > 0 ? (
        <div>
          {data.map((order) => (
            <div className="OrderPreview" key={order.id}>
              <h2>Order Number {order.id}</h2>
              <p>Type: {order.type}</p>
              <p>Model: {order.model}</p>
              <p>Spare part: {order.spare_part}</p>
              <p>Created at: {order.created_at}</p>
              <p>Status: {order.status}</p>
              <p>Phone number: {order.phone_number}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}

      {isLoading && <p>Loading more orders...</p>}
      {!isLoading && !hasMore && <p>No more orders to load.</p>}

      <div className="LoadMoreButton">
        <button onClick={loadMoreOrders} disabled={isLoading || !hasMore}>
          {isLoading ? 'Loading...' : 'Load More Orders'}
        </button>
      </div>
    </div>
  );
};

export default OngoingOrders;
