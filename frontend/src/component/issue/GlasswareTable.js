import React from 'react'
import { Table, Button } from 'react-bootstrap'
const GlasswareTable = (props) => {
  return (
        <>
          {/* <div className="border mt-5"></div> */}
          <div className="container mt-5" style={{ overflowX: "scroll" }}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th style={{ paddingLeft: "2rem" }}>#</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Material Type</th>
                  <th>Quantity</th>
                  <th>Manufacturer</th>
                  <th>Supplier</th>
                  <th>Issue Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                 props.item.map((el, i) => (
                    <tr key={el.id}>
                      <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                      <td>{el.object.name}</td>
                      <td>{el.object.size}</td>
                      <td>{el.object.material_type}</td>
                      <td>{el.object.quantity}</td>
                      <td>{el.object.manufacturer}</td>
                      <td>{el.object.supplier}</td>
                      <td>{el.quantity}</td>
                      <td>
                        {/* <div>
                          <Button
                            onClick={() => editInstrumentHandler(el)}
                            variant="primary"
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => deleteFromTempShipmentHandler(el.id)}
                            disabled={
                              el.id === deleteLoading.id &&
                              deleteLoading.loading
                            }
                          >
                            {el.id === deleteLoading.id &&
                              deleteLoading.loading && (
                                <div
                                  class="spinner-border spinner-border-sm me-2"
                                  role="status"
                                >
                                  <span class="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              )}
                            Delete
                          </Button>
                        </div> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </>
  )
}

export default GlasswareTable