import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import lessthan from "../../../assets/svg/lessThan.svg";
import axios from "../../../components/Hooks/axios";
import styles from "./Product.module.scss";

function Product() {
	const [editMode, setEditMode] = useState(false);
	const [newImageUrl, setNewImageUrl] = useState("");
	const [newImage, setNewImage] = useState(null);
	const [newTitle, setNewTitle] = useState("");
	const [newType, setNewType] = useState("");
	const [selectedProductIndex, setSelectedProductIndex] = useState(null);
	const [productsData, setProductsData] = useState([]);
	const [productLoading, setProductLoading] = useState(true);
	const [reload, setReload] = useState(0);
	const fileInputRef = useRef(null);
	const [addPopup, setAddPopup] = useState(false);

	const handleImageClick = () => {
		if (editMode) {
			fileInputRef.current.click();
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setNewImage(file);
			console.log(file);
			setNewImageUrl(URL.createObjectURL(file));
		}
	};

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value);
	};

	const handleTypeChange = (e) => {
		setNewType(e.target.value);
	};

	const handleSaveClick = (id) => {
		const formData = new FormData();
		if (newImage) {
			formData.append("productImage", newImage);
		}
		formData.append("title", newTitle);
		formData.append("type", newType);

		setProductLoading(true);

		axios
			.put(`/product/update/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log("Product updated successfully:", response.data);
				setReload(Math.random());
				setEditMode(false);
				setNewImageUrl("");
				setNewTitle("");
				setNewType("");
				setSelectedProductIndex(null);
				setProductLoading(false);
			})
			.catch((error) => {
				console.error("Error updating product:", error);
				setProductLoading(false);
			});
	};

	const handleEditClick = (index) => {
		setEditMode(!editMode);
		setSelectedProductIndex(index);

		setNewImageUrl(productsData[index].imgUrl);
		setNewTitle(productsData[index].title);
		setNewType(productsData[index].type);
	};

	const handleDelete = (id) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this product?");
		if (!confirmDelete) return; 

		axios
			.delete(`/product/delete/${id}`)
			.then(({ data }) => {
				console.log(data);
				setReload(Math.random());
				toast.success("Product deleted");
			})
			.catch((err) => {
				console.log(err.message);
				toast.error(err.message || "Something went wrong...");
			});
	};


	useEffect(() => {
		axios
			.get(`/product`)
			.then(({ data }) => {
				setProductsData(data);
			})
			.catch((e) => console.log(e));
	}, [reload]);

	return (
		<div className={styles.productContainer}>
			<button onClick={() => setAddPopup(true)}>Add Product</button>
			{productsData &&
				productsData.map((item, i) => (
					<div key={i} className={styles.items} style={{ border: "1px solid red" }}>
						{editMode && i === selectedProductIndex ? (
							<>
								<h2>
									<input type="text" value={newTitle} onChange={handleTitleChange} />
								</h2>
								<input type="text" value={newType} onChange={handleTypeChange} placeholder="Type" />
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									ref={fileInputRef}
									style={{ display: "none" }}
								/>
								{newImageUrl ? (
									<>
										<img
											src={newImageUrl}
											alt="Preview"
											className={styles.preview}
											onClick={handleImageClick}
											style={{ cursor: "pointer" }}
										/>
										<button onClick={() => handleSaveClick(item?._id)}>Save</button>
										{editMode ? (
											<button onClick={() => setEditMode(false)}>Cancel</button>
										) : (
											<button onClick={() => handleDelete(item._id)}>Delete</button>
										)}
									</>
								) : (
									<p>No image selected</p>
								)}
							</>
						) : (
							<>
								<h2>{item.title}</h2>
								<p> {item.type}</p>
								<img src={item.imgUrl} alt="" style={{ cursor: "not-allowed" }} />
								<button onClick={() => handleEditClick(i)}>Edit</button>
								<button onClick={() => handleDelete(item._id)}>Delete</button>
							</>
						)}
					</div>
				))}

			{addPopup && <AddProductPopup setAddPopup={setAddPopup} setReload={setReload} />}
		</div>
	);
}
export default Product;

const AddProductPopup = ({ setAddPopup, setReload }) => {
	const [newProductTitle, setNewProductTitle] = useState("");
	const [newProductImage, setNewProductImage] = useState("");
	const [newProductImageUrl, setNewProductImageUrl] = useState("");
	const [newProductType, setNewProductType] = useState("");
	const [loading, setLoading] = useState(false)

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setNewProductImage(file);
			setNewProductImageUrl(URL.createObjectURL(file));
		}
	};

	const handleAddProduct = () => {
		// setProductsData([...productsData, newProduct]);
		const formData = new FormData();
		formData.append("title", newProductTitle);
		formData.append("type", newProductType);
		formData.append("productImage", newProductImage);
		setLoading(true);
		axios
		.post(`/product/create`, formData)
		.then(({ data }) => {
			setReload(Math.random());
			console.log(data);
			setAddPopup(false);
			toast.success("Product Added");
			setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={styles.addProduct}>
			<div className={styles.container}>
				<div className={styles.lessThan}>
					<img src={lessthan} alt="" onClick={() => setAddPopup(false)} />
				</div>
				<div className={styles.InputWrapper}>
					<label htmlFor="">Product Title : </label>
					<input
						type="text"
						placeholder="Product Title"
						value={newProductTitle}
						onChange={(e) => setNewProductTitle(e.target.value)}
					/>
				</div>
				<div className={styles.InputWrapper}>
					<label htmlFor="">Type : </label>
					<input
						type="text"
						placeholder="Type"
						value={newProductType}
						onChange={(e) => setNewProductType(e.target.value)}
					/>
				</div>

				<div className={styles.addImage}>
					<input type="file" accept="image/*" onChange={handleImageChange} />
					{newProductImage && <img src={newProductImageUrl} alt="Preview" className={styles.preview} />}
				</div>
				<button onClick={handleAddProduct} disabled={loading}>
					{loading ? "Loading..." : "Add Product"}
				</button>
			</div>
		</div>
	);
};
