import React, { useState, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import SnackOrBoozeApi from './Api';


function Home() {
  const [itesmOffered, setItemsOffered] = useState();

  useEffect(() => {
    const getTotalItems = async () => {
      let totalItemsOffered = await SnackOrBoozeApi.getTotalCount();
      
      setItemsOffered(totalItemsOffered);
    }
    getTotalItems();
  }, []);

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <CardText className='text-center'>
            <p>We currently carry: {itesmOffered} different items!</p>
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
