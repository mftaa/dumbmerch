import React, { useState } from "react";
import Navbar from "../../components/organism/navbar";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PRODUCTS,
  DELETE_PRODUCTS,
  POST_PRODUCTS,
} from "../../utils/gql/products/constant";
import Modal from "react-modal";
import HOC from "../../components/HOC";
import { useSelector } from "react-redux";
import { Formik, Form, Field, useFormik } from "formik";
import { setContext } from "@apollo/client/link/context";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const listProduct = () => {
  const [mutationCreateProduct] = useMutation(POST_PRODUCTS);
  const { data: getProducts, refetch: refetchProduct } = useQuery(GET_PRODUCTS);
  console.log(getProducts);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    refetchProduct();
  }
  const { user, token } = useSelector((state) => state.auth);

  console.log(token);
  const [mutationDeleteProduct] = useMutation(DELETE_PRODUCTS);

  const handledelete = async (id) => {
    const { data } = await mutationDeleteProduct({
      variables: {
        id: id,
      },
    });

    refetchProduct();
  };

  const rupiah = (value) => {
    let price = value.toString(),
      sisa = price.length % 3,
      rupiah = price.substr(0, sisa),
      ribuan = price.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah;
  };

  return (
    <div className="bg-slate-800 h-[100%]">
      <Navbar />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <p className="text-3xl text-center font-bold">Add Product</p>
          <Formik
            initialValues={{
              name: "",
              stock: "",
              description: "",
              price: "",
              image: "",
            }}
            // validationSchema={SignInSchema}
            onSubmit={async (values) => {
              console.log(values);
              // same shape as initial values
              const { data } = await mutationCreateProduct({
                variables: {
                  input: {
                    name: values.name,
                    stock: values.stock,
                    image: values.image,
                    description: values.description,
                    price: values.price,
                  },
                },
              });
              console.log(data);

              setIsOpen(false);
              refetchProduct();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <p className="my-2">Name Product</p>
                <Field
                  name="name"
                  type="text"
                  className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                />

                <p className="my-1">Stock</p>
                <Field
                  name="stock"
                  type="number"
                  className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                />

                <p className="my-1">Image</p>
                <Field
                  name="image"
                  type="file"
                  className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                />
                <p className="my-1">Price</p>
                <Field
                  name="price"
                  type="number"
                  className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                />
                <p className="my-1">description</p>
                <Field
                  name="description"
                  type="text"
                  className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                />
                <button
                  type="submit"
                  className="border-2 border-black px-3 mt-8 w-full h-10 text-xl rounded bg-red-500 hover:bg-red-700 hover:text-white hover:border-[#D9D9D9] duration-200"
                  // onClick={closeModal}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <div className="flex w-screen py-5">
        <p className="text-2xl font-bold text-white py-2 ml-[86px]">
          List Product
        </p>
        <button
          className="btn bg-slate-400 ml-[70%]"
          onClick={() => openModal(true)}
        >
          Add Product
        </button>
      </div>
      <div className="px-5 mt-[34px]">
        <table className="table table-zebra w-full z-0">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getProducts?.products?.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item.image}</td>
                <td>{item.name}</td>
                <td>{`Rp. ${rupiah(item.price)},00`}</td>
                <td>{item.stock}</td>
                <td className="gap-5 w-32">
                  <button className="btn bg-green-500">Edit</button>
                  <button
                    className="btn ml-5 bg-red-500"
                    onClick={(id) => {
                      handledelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HOC(listProduct);
