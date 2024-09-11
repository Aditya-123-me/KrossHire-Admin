import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Hooks/Loading";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDeleteAlert } from "../../components/Hooks/useDeleteAlert";
import { setRefreshTag } from "../../redux/slice/tempSlice";
import styles from "./Tag.module.scss";

const Tag = () => {
	const [loading, setLoading] = useState(false);

	const { refreshTag } = useSelector((state) => state.temp);
	const dispatch = useDispatch();

	const [tags, setTags] = useState([]);
	useEffect(() => {
		setLoading(true);

		axios
			.get(`/tags`)
			.then(({ data }) => {
				console.log(data);
				setTags(data?.data);
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	}, [refreshTag]);

	const handleAddTag = async () => {
		const { value: tagName } = await Swal.fire({
			title: "Enter tag name",
			input: "text",
			inputPlaceholder: "Enter tag name",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "Add",
			cancelButtonText: "Cancel",
			confirmButtonColor: "#ff621f",
			cancelButtonColor: "#d33",
			showLoaderOnConfirm: true,
			preConfirm: async (name) => {
				try {
					const response = await axios.post("/tags", { name });

					if (response.status !== 201) {
						return Swal.showValidationMessage(`Error: ${response.data.msg || "Failed to add tag"}`);
					}

					// Return the response if successful
					return response.data;
				} catch (error) {
					Swal.showValidationMessage(`Request failed: ${error.response?.data?.msg || error.message}`);
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});

		// After the tag is successfully added
		if (tagName) {
			dispatch(setRefreshTag());
			Swal.fire({
				icon: "success",
				title: "Tag added successfully",
				text: `The tag "${tagName?.data?.name}" has been added!`,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Cancelled",
				text: "Tag addition was cancelled!",
			});
		}
	};

	return (
		<div className={styles.Tag}>
			<div className={styles.Heading}>
				<button className={styles.refresh} onClick={() => dispatch(setRefreshTag())}>
					Refresh
				</button>

				<button className={styles.AddDeveloper} onClick={() => handleAddTag()}>
					Add New Tag
				</button>
			</div>
			<div className={styles.TagContainer}>{loading ? <Loading /> : tags?.map((tag) => <TagItem tag={tag} key={tag._id} />)}</div>
		</div>
	);
};

export default Tag;

const TagItem = ({ tag }) => {
	const dispatch = useDispatch();
	const handleDelete = async (id) => {
		const confirmed = await useDeleteAlert();
		if (!confirmed) return;

		axios
			.delete(`/tags/${id}`)
			.then(({ data }) => {
				toast.success("Successfully Deleted !");
				dispatch(setRefreshTag());
			})
			.catch((e) => console.log(e));
	};
	return (
		<div className={styles.TagItem}>
			<p>{tag?.name}</p>

			<div className={styles.Actions}>
				<p>
					<FaEdit />
				</p>
				<p onClick={() => handleDelete(tag._id)}>
					<FaTrashAlt />
				</p>
			</div>
		</div>
	);
};
