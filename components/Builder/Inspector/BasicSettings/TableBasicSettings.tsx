import Axios from "@/components/axios";
import { updateProps } from "@/redux/features/components/componentsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TableBasicSettings = ({ component }: { component: any }) => {
  const dispatch = useDispatch();
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState([]);

  // effect for collection data
  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await Axios.get(`http://10.20.30.2:7000/pr/collection`);
      if (data.length > 0) {
        let nData = [];
        for (const d of data) {
          nData.push(d.name);
        }

        setCollections([...new Set(nData)]);
      }
    };
    fetchCollections();
  }, []);

  // effect for collection data
  useEffect(() => {
    if (!collectionName) return;
    const collData = async () => {
      const { data } = await Axios.get(
        `http://10.20.30.2:7000/pr/crud/${collectionName}`
      );
      setCollectionData(data);
    };
    collData();
  }, [collectionName]);

  
  return (
    <div>
      Select Collection
      <select
        onChange={(e: any) => {
          if (e.target.value) {
            dispatch(
              updateProps({
                id: component.id,
                name: "table_name",
                value: e.target.value,
              })
            );
            dispatch(
              updateProps({
                id: component.id,
                name: "table_api",
                value: `http://10.20.30.2:7000/pr/crud/${e.target.value}`,
              })
            );
            const collData = async () => {
              const { data } = await Axios.get(
                `http://10.20.30.2:7000/pr/crud/${e.target.value}`
              );
              if (data.length > 0) {
                dispatch(
                  updateProps({
                    id: component.id,
                    name: "table_data",
                    value: data,
                  })
                );
              }
            };
            collData();
          }
        }}
        className="w-full border-2"
        id="content"
        name="text"
        type="text"
        value={component?.props?.table_name}
        placeholder="write something here"
      >
        <option value="">Choose a Collection</option>
        {collections.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TableBasicSettings;
