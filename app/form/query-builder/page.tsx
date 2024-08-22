"use client";
import DynamicForm from "@/components/Preview/DynamicForm/DynamicForm";
import React from "react";
import { queryData } from "./data/queryData";
import Button from "@/components/Preview/ui/button/Button";
import QueryBuilderForm from "@/components/Preview/StepperForm/QueryBuilder";

const QueryBuilder = () => {
  return (
    <div>
      <h3>Query Builder</h3>
      <section>
        <QueryBuilderForm />
      </section>
    </div>
  );
};

export default QueryBuilder;
