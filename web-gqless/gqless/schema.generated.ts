/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { ScalarsEnumsHash } from "gqless";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: number;
  json: any;
  smallint: number;
  timestamptz: string;
  uuid: string;
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {
  _eq?: Maybe<Scalars["Int"]>;
  _gt?: Maybe<Scalars["Int"]>;
  _gte?: Maybe<Scalars["Int"]>;
  _in?: Maybe<Array<Scalars["Int"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Int"]>;
  _lte?: Maybe<Scalars["Int"]>;
  _neq?: Maybe<Scalars["Int"]>;
  _nin?: Maybe<Array<Scalars["Int"]>>;
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export interface String_comparison_exp {
  _eq?: Maybe<Scalars["String"]>;
  _gt?: Maybe<Scalars["String"]>;
  _gte?: Maybe<Scalars["String"]>;
  _ilike?: Maybe<Scalars["String"]>;
  _in?: Maybe<Array<Scalars["String"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _like?: Maybe<Scalars["String"]>;
  _lt?: Maybe<Scalars["String"]>;
  _lte?: Maybe<Scalars["String"]>;
  _neq?: Maybe<Scalars["String"]>;
  _nilike?: Maybe<Scalars["String"]>;
  _nin?: Maybe<Array<Scalars["String"]>>;
  _nlike?: Maybe<Scalars["String"]>;
  _nsimilar?: Maybe<Scalars["String"]>;
  _similar?: Maybe<Scalars["String"]>;
}

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export interface json_comparison_exp {
  _eq?: Maybe<Scalars["json"]>;
  _gt?: Maybe<Scalars["json"]>;
  _gte?: Maybe<Scalars["json"]>;
  _in?: Maybe<Array<Scalars["json"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["json"]>;
  _lte?: Maybe<Scalars["json"]>;
  _neq?: Maybe<Scalars["json"]>;
  _nin?: Maybe<Array<Scalars["json"]>>;
}

/** column ordering options */
export enum order_by {
  /** in the ascending order, nulls last */
  asc = "asc",
  /** in the ascending order, nulls first */
  asc_nulls_first = "asc_nulls_first",
  /** in the ascending order, nulls last */
  asc_nulls_last = "asc_nulls_last",
  /** in the descending order, nulls first */
  desc = "desc",
  /** in the descending order, nulls first */
  desc_nulls_first = "desc_nulls_first",
  /** in the descending order, nulls last */
  desc_nulls_last = "desc_nulls_last",
}

/** order by aggregate values of table "posts" */
export interface posts_aggregate_order_by {
  avg?: Maybe<posts_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<posts_max_order_by>;
  min?: Maybe<posts_min_order_by>;
  stddev?: Maybe<posts_stddev_order_by>;
  stddev_pop?: Maybe<posts_stddev_pop_order_by>;
  stddev_samp?: Maybe<posts_stddev_samp_order_by>;
  sum?: Maybe<posts_sum_order_by>;
  var_pop?: Maybe<posts_var_pop_order_by>;
  var_samp?: Maybe<posts_var_samp_order_by>;
  variance?: Maybe<posts_variance_order_by>;
}

/** input type for inserting array relation for remote table "posts" */
export interface posts_arr_rel_insert_input {
  data: Array<posts_insert_input>;
}

/** order by avg() on columns of table "posts" */
export interface posts_avg_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export interface posts_bool_exp {
  _and?: Maybe<Array<Maybe<posts_bool_exp>>>;
  _not?: Maybe<posts_bool_exp>;
  _or?: Maybe<Array<Maybe<posts_bool_exp>>>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  id?: Maybe<Int_comparison_exp>;
  title?: Maybe<String_comparison_exp>;
  updated_at?: Maybe<timestamptz_comparison_exp>;
  url?: Maybe<String_comparison_exp>;
  user?: Maybe<users_bool_exp>;
  user_id?: Maybe<Int_comparison_exp>;
  votes?: Maybe<votes_bool_exp>;
}

/** input type for inserting data into table "posts" */
export interface posts_insert_input {
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "posts" */
export interface posts_max_order_by {
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  title?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  url?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by min() on columns of table "posts" */
export interface posts_min_order_by {
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  title?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  url?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "posts" */
export interface posts_obj_rel_insert_input {
  data: posts_insert_input;
}

/** ordering options when selecting data from "posts" */
export interface posts_order_by {
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  title?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  url?: Maybe<order_by>;
  user?: Maybe<users_order_by>;
  user_id?: Maybe<order_by>;
  votes_aggregate?: Maybe<votes_aggregate_order_by>;
}

/** primary key columns input for table: "posts" */
export interface posts_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "posts" */
export enum posts_select_column {
  /** column name */
  created_at = "created_at",
  /** column name */
  id = "id",
  /** column name */
  title = "title",
  /** column name */
  updated_at = "updated_at",
  /** column name */
  url = "url",
  /** column name */
  user_id = "user_id",
}

/** order by stddev() on columns of table "posts" */
export interface posts_stddev_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "posts" */
export interface posts_stddev_pop_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "posts" */
export interface posts_stddev_samp_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by sum() on columns of table "posts" */
export interface posts_sum_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by var_pop() on columns of table "posts" */
export interface posts_var_pop_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "posts" */
export interface posts_var_samp_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by variance() on columns of table "posts" */
export interface posts_variance_order_by {
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export interface smallint_comparison_exp {
  _eq?: Maybe<Scalars["smallint"]>;
  _gt?: Maybe<Scalars["smallint"]>;
  _gte?: Maybe<Scalars["smallint"]>;
  _in?: Maybe<Array<Scalars["smallint"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["smallint"]>;
  _lte?: Maybe<Scalars["smallint"]>;
  _neq?: Maybe<Scalars["smallint"]>;
  _nin?: Maybe<Array<Scalars["smallint"]>>;
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export interface timestamptz_comparison_exp {
  _eq?: Maybe<Scalars["timestamptz"]>;
  _gt?: Maybe<Scalars["timestamptz"]>;
  _gte?: Maybe<Scalars["timestamptz"]>;
  _in?: Maybe<Array<Scalars["timestamptz"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["timestamptz"]>;
  _lte?: Maybe<Scalars["timestamptz"]>;
  _neq?: Maybe<Scalars["timestamptz"]>;
  _nin?: Maybe<Array<Scalars["timestamptz"]>>;
}

/** order by aggregate values of table "users" */
export interface users_aggregate_order_by {
  avg?: Maybe<users_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<users_max_order_by>;
  min?: Maybe<users_min_order_by>;
  stddev?: Maybe<users_stddev_order_by>;
  stddev_pop?: Maybe<users_stddev_pop_order_by>;
  stddev_samp?: Maybe<users_stddev_samp_order_by>;
  sum?: Maybe<users_sum_order_by>;
  var_pop?: Maybe<users_var_pop_order_by>;
  var_samp?: Maybe<users_var_samp_order_by>;
  variance?: Maybe<users_variance_order_by>;
}

/** order by avg() on columns of table "users" */
export interface users_avg_order_by {
  id?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export interface users_bool_exp {
  _and?: Maybe<Array<Maybe<users_bool_exp>>>;
  _not?: Maybe<users_bool_exp>;
  _or?: Maybe<Array<Maybe<users_bool_exp>>>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  email?: Maybe<String_comparison_exp>;
  email_verified?: Maybe<timestamptz_comparison_exp>;
  id?: Maybe<Int_comparison_exp>;
  image?: Maybe<String_comparison_exp>;
  name?: Maybe<String_comparison_exp>;
  posts?: Maybe<posts_bool_exp>;
  updated_at?: Maybe<timestamptz_comparison_exp>;
  votes?: Maybe<votes_bool_exp>;
}

/** order by max() on columns of table "users" */
export interface users_max_order_by {
  created_at?: Maybe<order_by>;
  email?: Maybe<order_by>;
  email_verified?: Maybe<order_by>;
  id?: Maybe<order_by>;
  image?: Maybe<order_by>;
  name?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** order by min() on columns of table "users" */
export interface users_min_order_by {
  created_at?: Maybe<order_by>;
  email?: Maybe<order_by>;
  email_verified?: Maybe<order_by>;
  id?: Maybe<order_by>;
  image?: Maybe<order_by>;
  name?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** ordering options when selecting data from "users" */
export interface users_order_by {
  created_at?: Maybe<order_by>;
  email?: Maybe<order_by>;
  email_verified?: Maybe<order_by>;
  id?: Maybe<order_by>;
  image?: Maybe<order_by>;
  name?: Maybe<order_by>;
  posts_aggregate?: Maybe<posts_aggregate_order_by>;
  updated_at?: Maybe<order_by>;
  votes_aggregate?: Maybe<votes_aggregate_order_by>;
}

/** primary key columns input for table: "users" */
export interface users_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "users" */
export enum users_select_column {
  /** column name */
  created_at = "created_at",
  /** column name */
  email = "email",
  /** column name */
  email_verified = "email_verified",
  /** column name */
  id = "id",
  /** column name */
  image = "image",
  /** column name */
  name = "name",
  /** column name */
  updated_at = "updated_at",
}

/** order by stddev() on columns of table "users" */
export interface users_stddev_order_by {
  id?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "users" */
export interface users_stddev_pop_order_by {
  id?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "users" */
export interface users_stddev_samp_order_by {
  id?: Maybe<order_by>;
}

/** order by sum() on columns of table "users" */
export interface users_sum_order_by {
  id?: Maybe<order_by>;
}

/** order by var_pop() on columns of table "users" */
export interface users_var_pop_order_by {
  id?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "users" */
export interface users_var_samp_order_by {
  id?: Maybe<order_by>;
}

/** order by variance() on columns of table "users" */
export interface users_variance_order_by {
  id?: Maybe<order_by>;
}

/** order by aggregate values of table "votes" */
export interface votes_aggregate_order_by {
  avg?: Maybe<votes_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<votes_max_order_by>;
  min?: Maybe<votes_min_order_by>;
  stddev?: Maybe<votes_stddev_order_by>;
  stddev_pop?: Maybe<votes_stddev_pop_order_by>;
  stddev_samp?: Maybe<votes_stddev_samp_order_by>;
  sum?: Maybe<votes_sum_order_by>;
  var_pop?: Maybe<votes_var_pop_order_by>;
  var_samp?: Maybe<votes_var_samp_order_by>;
  variance?: Maybe<votes_variance_order_by>;
}

/** order by avg() on columns of table "votes" */
export interface votes_avg_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "votes". All fields are combined with a logical 'AND'. */
export interface votes_bool_exp {
  _and?: Maybe<Array<Maybe<votes_bool_exp>>>;
  _not?: Maybe<votes_bool_exp>;
  _or?: Maybe<Array<Maybe<votes_bool_exp>>>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  id?: Maybe<Int_comparison_exp>;
  post?: Maybe<posts_bool_exp>;
  post_id?: Maybe<Int_comparison_exp>;
  updated_at?: Maybe<timestamptz_comparison_exp>;
  user?: Maybe<users_bool_exp>;
  user_id?: Maybe<Int_comparison_exp>;
  value?: Maybe<smallint_comparison_exp>;
}

/** order by max() on columns of table "votes" */
export interface votes_max_order_by {
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by min() on columns of table "votes" */
export interface votes_min_order_by {
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** ordering options when selecting data from "votes" */
export interface votes_order_by {
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  post?: Maybe<posts_order_by>;
  post_id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  user?: Maybe<users_order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** primary key columns input for table: "votes" */
export interface votes_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "votes" */
export enum votes_select_column {
  /** column name */
  created_at = "created_at",
  /** column name */
  id = "id",
  /** column name */
  post_id = "post_id",
  /** column name */
  updated_at = "updated_at",
  /** column name */
  user_id = "user_id",
  /** column name */
  value = "value",
}

/** order by stddev() on columns of table "votes" */
export interface votes_stddev_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "votes" */
export interface votes_stddev_pop_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "votes" */
export interface votes_stddev_samp_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by sum() on columns of table "votes" */
export interface votes_sum_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by var_pop() on columns of table "votes" */
export interface votes_var_pop_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "votes" */
export interface votes_var_samp_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** order by variance() on columns of table "votes" */
export interface votes_variance_order_by {
  id?: Maybe<order_by>;
  post_id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  Float: true,
  ID: true,
  Int: true,
  String: true,
  bigint: true,
  json: true,
  order_by: true,
  posts_select_column: true,
  smallint: true,
  timestamptz: true,
  users_select_column: true,
  uuid: true,
  votes_select_column: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    posts: {
      __type: "[posts!]!",
      __args: {
        distinct_on: "[posts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[posts_order_by!]",
        where: "posts_bool_exp",
      },
    },
    posts_aggregate: {
      __type: "posts_aggregate!",
      __args: {
        distinct_on: "[posts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[posts_order_by!]",
        where: "posts_bool_exp",
      },
    },
    posts_by_pk: { __type: "posts", __args: { id: "Int!" } },
    session: { __type: "SessionOutput" },
    users: {
      __type: "[users!]!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_aggregate: {
      __type: "users_aggregate!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_by_pk: { __type: "users", __args: { id: "Int!" } },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_by_pk: { __type: "votes", __args: { id: "Int!" } },
  },
  mutation: {
    __typename: { __type: "String!" },
    insert_posts: {
      __type: "posts_mutation_response",
      __args: { objects: "[posts_insert_input!]!" },
    },
    insert_posts_one: { __type: "posts", __args: { object: "posts_insert_input!" } },
    vote: { __type: "VoteOutput!", __args: { post_id: "Int!", value: "smallint!" } },
  },
  subscription: {
    __typename: { __type: "String!" },
    posts: {
      __type: "[posts!]!",
      __args: {
        distinct_on: "[posts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[posts_order_by!]",
        where: "posts_bool_exp",
      },
    },
    posts_aggregate: {
      __type: "posts_aggregate!",
      __args: {
        distinct_on: "[posts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[posts_order_by!]",
        where: "posts_bool_exp",
      },
    },
    posts_by_pk: { __type: "posts", __args: { id: "Int!" } },
    session: { __type: "SessionOutput" },
    users: {
      __type: "[users!]!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_aggregate: {
      __type: "users_aggregate!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_by_pk: { __type: "users", __args: { id: "Int!" } },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_by_pk: { __type: "votes", __args: { id: "Int!" } },
  },
  Int_comparison_exp: {
    _eq: { __type: "Int" },
    _gt: { __type: "Int" },
    _gte: { __type: "Int" },
    _in: { __type: "[Int!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "Int" },
    _lte: { __type: "Int" },
    _neq: { __type: "Int" },
    _nin: { __type: "[Int!]" },
  },
  SessionOutput: {
    __typename: { __type: "String!" },
    role: { __type: "String" },
    user: { __type: "users" },
    user_id: { __type: "Int" },
  },
  String_comparison_exp: {
    _eq: { __type: "String" },
    _gt: { __type: "String" },
    _gte: { __type: "String" },
    _ilike: { __type: "String" },
    _in: { __type: "[String!]" },
    _is_null: { __type: "Boolean" },
    _like: { __type: "String" },
    _lt: { __type: "String" },
    _lte: { __type: "String" },
    _neq: { __type: "String" },
    _nilike: { __type: "String" },
    _nin: { __type: "[String!]" },
    _nlike: { __type: "String" },
    _nsimilar: { __type: "String" },
    _similar: { __type: "String" },
  },
  VoteOutput: {
    __typename: { __type: "String!" },
    vote: { __type: "votes" },
    vote_id: { __type: "Int!" },
  },
  json_comparison_exp: {
    _eq: { __type: "json" },
    _gt: { __type: "json" },
    _gte: { __type: "json" },
    _in: { __type: "[json!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "json" },
    _lte: { __type: "json" },
    _neq: { __type: "json" },
    _nin: { __type: "[json!]" },
  },
  posts: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz!" },
    id: { __type: "Int!" },
    my_vote_value: { __type: "smallint" },
    title: { __type: "String!" },
    updated_at: { __type: "timestamptz!" },
    url: { __type: "String!" },
    user: { __type: "users" },
    user_id: { __type: "Int" },
    vote_total: { __type: "bigint" },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
  },
  posts_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "posts_aggregate_fields" },
    nodes: { __type: "[posts!]!" },
  },
  posts_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "posts_avg_fields" },
    count: { __type: "Int", __args: { columns: "[posts_select_column!]", distinct: "Boolean" } },
    max: { __type: "posts_max_fields" },
    min: { __type: "posts_min_fields" },
    stddev: { __type: "posts_stddev_fields" },
    stddev_pop: { __type: "posts_stddev_pop_fields" },
    stddev_samp: { __type: "posts_stddev_samp_fields" },
    sum: { __type: "posts_sum_fields" },
    var_pop: { __type: "posts_var_pop_fields" },
    var_samp: { __type: "posts_var_samp_fields" },
    variance: { __type: "posts_variance_fields" },
  },
  posts_aggregate_order_by: {
    avg: { __type: "posts_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "posts_max_order_by" },
    min: { __type: "posts_min_order_by" },
    stddev: { __type: "posts_stddev_order_by" },
    stddev_pop: { __type: "posts_stddev_pop_order_by" },
    stddev_samp: { __type: "posts_stddev_samp_order_by" },
    sum: { __type: "posts_sum_order_by" },
    var_pop: { __type: "posts_var_pop_order_by" },
    var_samp: { __type: "posts_var_samp_order_by" },
    variance: { __type: "posts_variance_order_by" },
  },
  posts_arr_rel_insert_input: { data: { __type: "[posts_insert_input!]!" } },
  posts_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_avg_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_bool_exp: {
    _and: { __type: "[posts_bool_exp]" },
    _not: { __type: "posts_bool_exp" },
    _or: { __type: "[posts_bool_exp]" },
    created_at: { __type: "timestamptz_comparison_exp" },
    id: { __type: "Int_comparison_exp" },
    title: { __type: "String_comparison_exp" },
    updated_at: { __type: "timestamptz_comparison_exp" },
    url: { __type: "String_comparison_exp" },
    user: { __type: "users_bool_exp" },
    user_id: { __type: "Int_comparison_exp" },
    votes: { __type: "votes_bool_exp" },
  },
  posts_insert_input: { title: { __type: "String" }, url: { __type: "String" } },
  posts_max_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    id: { __type: "Int" },
    title: { __type: "String" },
    updated_at: { __type: "timestamptz" },
    url: { __type: "String" },
    user_id: { __type: "Int" },
  },
  posts_max_order_by: {
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    title: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    url: { __type: "order_by" },
    user_id: { __type: "order_by" },
  },
  posts_min_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    id: { __type: "Int" },
    title: { __type: "String" },
    updated_at: { __type: "timestamptz" },
    url: { __type: "String" },
    user_id: { __type: "Int" },
  },
  posts_min_order_by: {
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    title: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    url: { __type: "order_by" },
    user_id: { __type: "order_by" },
  },
  posts_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[posts!]!" },
  },
  posts_obj_rel_insert_input: { data: { __type: "posts_insert_input!" } },
  posts_order_by: {
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    title: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    url: { __type: "order_by" },
    user: { __type: "users_order_by" },
    user_id: { __type: "order_by" },
    votes_aggregate: { __type: "votes_aggregate_order_by" },
  },
  posts_pk_columns_input: { id: { __type: "Int!" } },
  posts_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_stddev_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_stddev_pop_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_stddev_samp_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    user_id: { __type: "Int" },
  },
  posts_sum_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_var_pop_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_var_samp_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  posts_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    user_id: { __type: "Float" },
  },
  posts_variance_order_by: { id: { __type: "order_by" }, user_id: { __type: "order_by" } },
  smallint_comparison_exp: {
    _eq: { __type: "smallint" },
    _gt: { __type: "smallint" },
    _gte: { __type: "smallint" },
    _in: { __type: "[smallint!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "smallint" },
    _lte: { __type: "smallint" },
    _neq: { __type: "smallint" },
    _nin: { __type: "[smallint!]" },
  },
  timestamptz_comparison_exp: {
    _eq: { __type: "timestamptz" },
    _gt: { __type: "timestamptz" },
    _gte: { __type: "timestamptz" },
    _in: { __type: "[timestamptz!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "timestamptz" },
    _lte: { __type: "timestamptz" },
    _neq: { __type: "timestamptz" },
    _nin: { __type: "[timestamptz!]" },
  },
  users: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz!" },
    email: { __type: "String" },
    email_verified: { __type: "timestamptz" },
    id: { __type: "Int!" },
    image: { __type: "String" },
    name: { __type: "String" },
    posts: {
      __type: "[posts!]!",
      __args: {
        distinct_on: "[posts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[posts_order_by!]",
        where: "posts_bool_exp",
      },
    },
    posts_aggregate: {
      __type: "posts_aggregate!",
      __args: {
        distinct_on: "[posts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[posts_order_by!]",
        where: "posts_bool_exp",
      },
    },
    updated_at: { __type: "timestamptz!" },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
  },
  users_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "users_aggregate_fields" },
    nodes: { __type: "[users!]!" },
  },
  users_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "users_avg_fields" },
    count: { __type: "Int", __args: { columns: "[users_select_column!]", distinct: "Boolean" } },
    max: { __type: "users_max_fields" },
    min: { __type: "users_min_fields" },
    stddev: { __type: "users_stddev_fields" },
    stddev_pop: { __type: "users_stddev_pop_fields" },
    stddev_samp: { __type: "users_stddev_samp_fields" },
    sum: { __type: "users_sum_fields" },
    var_pop: { __type: "users_var_pop_fields" },
    var_samp: { __type: "users_var_samp_fields" },
    variance: { __type: "users_variance_fields" },
  },
  users_aggregate_order_by: {
    avg: { __type: "users_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "users_max_order_by" },
    min: { __type: "users_min_order_by" },
    stddev: { __type: "users_stddev_order_by" },
    stddev_pop: { __type: "users_stddev_pop_order_by" },
    stddev_samp: { __type: "users_stddev_samp_order_by" },
    sum: { __type: "users_sum_order_by" },
    var_pop: { __type: "users_var_pop_order_by" },
    var_samp: { __type: "users_var_samp_order_by" },
    variance: { __type: "users_variance_order_by" },
  },
  users_avg_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_avg_order_by: { id: { __type: "order_by" } },
  users_bool_exp: {
    _and: { __type: "[users_bool_exp]" },
    _not: { __type: "users_bool_exp" },
    _or: { __type: "[users_bool_exp]" },
    created_at: { __type: "timestamptz_comparison_exp" },
    email: { __type: "String_comparison_exp" },
    email_verified: { __type: "timestamptz_comparison_exp" },
    id: { __type: "Int_comparison_exp" },
    image: { __type: "String_comparison_exp" },
    name: { __type: "String_comparison_exp" },
    posts: { __type: "posts_bool_exp" },
    updated_at: { __type: "timestamptz_comparison_exp" },
    votes: { __type: "votes_bool_exp" },
  },
  users_max_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    email: { __type: "String" },
    email_verified: { __type: "timestamptz" },
    id: { __type: "Int" },
    image: { __type: "String" },
    name: { __type: "String" },
    updated_at: { __type: "timestamptz" },
  },
  users_max_order_by: {
    created_at: { __type: "order_by" },
    email: { __type: "order_by" },
    email_verified: { __type: "order_by" },
    id: { __type: "order_by" },
    image: { __type: "order_by" },
    name: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  users_min_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    email: { __type: "String" },
    email_verified: { __type: "timestamptz" },
    id: { __type: "Int" },
    image: { __type: "String" },
    name: { __type: "String" },
    updated_at: { __type: "timestamptz" },
  },
  users_min_order_by: {
    created_at: { __type: "order_by" },
    email: { __type: "order_by" },
    email_verified: { __type: "order_by" },
    id: { __type: "order_by" },
    image: { __type: "order_by" },
    name: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  users_order_by: {
    created_at: { __type: "order_by" },
    email: { __type: "order_by" },
    email_verified: { __type: "order_by" },
    id: { __type: "order_by" },
    image: { __type: "order_by" },
    name: { __type: "order_by" },
    posts_aggregate: { __type: "posts_aggregate_order_by" },
    updated_at: { __type: "order_by" },
    votes_aggregate: { __type: "votes_aggregate_order_by" },
  },
  users_pk_columns_input: { id: { __type: "Int!" } },
  users_stddev_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_stddev_order_by: { id: { __type: "order_by" } },
  users_stddev_pop_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_stddev_pop_order_by: { id: { __type: "order_by" } },
  users_stddev_samp_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_stddev_samp_order_by: { id: { __type: "order_by" } },
  users_sum_fields: { __typename: { __type: "String!" }, id: { __type: "Int" } },
  users_sum_order_by: { id: { __type: "order_by" } },
  users_var_pop_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_var_pop_order_by: { id: { __type: "order_by" } },
  users_var_samp_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_var_samp_order_by: { id: { __type: "order_by" } },
  users_variance_fields: { __typename: { __type: "String!" }, id: { __type: "Float" } },
  users_variance_order_by: { id: { __type: "order_by" } },
  votes: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz!" },
    id: { __type: "Int!" },
    post: { __type: "posts!" },
    post_id: { __type: "Int!" },
    updated_at: { __type: "timestamptz!" },
    user: { __type: "users!" },
    user_id: { __type: "Int!" },
    value: { __type: "smallint!" },
  },
  votes_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "votes_aggregate_fields" },
    nodes: { __type: "[votes!]!" },
  },
  votes_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "votes_avg_fields" },
    count: { __type: "Int", __args: { columns: "[votes_select_column!]", distinct: "Boolean" } },
    max: { __type: "votes_max_fields" },
    min: { __type: "votes_min_fields" },
    stddev: { __type: "votes_stddev_fields" },
    stddev_pop: { __type: "votes_stddev_pop_fields" },
    stddev_samp: { __type: "votes_stddev_samp_fields" },
    sum: { __type: "votes_sum_fields" },
    var_pop: { __type: "votes_var_pop_fields" },
    var_samp: { __type: "votes_var_samp_fields" },
    variance: { __type: "votes_variance_fields" },
  },
  votes_aggregate_order_by: {
    avg: { __type: "votes_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "votes_max_order_by" },
    min: { __type: "votes_min_order_by" },
    stddev: { __type: "votes_stddev_order_by" },
    stddev_pop: { __type: "votes_stddev_pop_order_by" },
    stddev_samp: { __type: "votes_stddev_samp_order_by" },
    sum: { __type: "votes_sum_order_by" },
    var_pop: { __type: "votes_var_pop_order_by" },
    var_samp: { __type: "votes_var_samp_order_by" },
    variance: { __type: "votes_variance_order_by" },
  },
  votes_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_avg_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_bool_exp: {
    _and: { __type: "[votes_bool_exp]" },
    _not: { __type: "votes_bool_exp" },
    _or: { __type: "[votes_bool_exp]" },
    created_at: { __type: "timestamptz_comparison_exp" },
    id: { __type: "Int_comparison_exp" },
    post: { __type: "posts_bool_exp" },
    post_id: { __type: "Int_comparison_exp" },
    updated_at: { __type: "timestamptz_comparison_exp" },
    user: { __type: "users_bool_exp" },
    user_id: { __type: "Int_comparison_exp" },
    value: { __type: "smallint_comparison_exp" },
  },
  votes_max_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    id: { __type: "Int" },
    post_id: { __type: "Int" },
    updated_at: { __type: "timestamptz" },
    user_id: { __type: "Int" },
    value: { __type: "smallint" },
  },
  votes_max_order_by: {
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_min_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    id: { __type: "Int" },
    post_id: { __type: "Int" },
    updated_at: { __type: "timestamptz" },
    user_id: { __type: "Int" },
    value: { __type: "smallint" },
  },
  votes_min_order_by: {
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_order_by: {
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    post: { __type: "posts_order_by" },
    post_id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    user: { __type: "users_order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_pk_columns_input: { id: { __type: "Int!" } },
  votes_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_stddev_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_stddev_pop_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_stddev_samp_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    post_id: { __type: "Int" },
    user_id: { __type: "Int" },
    value: { __type: "smallint" },
  },
  votes_sum_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_var_pop_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_var_samp_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    post_id: { __type: "Float" },
    user_id: { __type: "Float" },
    value: { __type: "Float" },
  },
  votes_variance_order_by: {
    id: { __type: "order_by" },
    post_id: { __type: "order_by" },
    user_id: { __type: "order_by" },
    value: { __type: "order_by" },
  },
} as const;

export interface Query {
  __typename: "Query" | undefined;
  posts: (args?: {
    distinct_on?: Array<ScalarsEnums["posts_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<posts_order_by>>;
    where?: Maybe<posts_bool_exp>;
  }) => Array<posts>;
  posts_aggregate: (args?: {
    distinct_on?: Array<ScalarsEnums["posts_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<posts_order_by>>;
    where?: Maybe<posts_bool_exp>;
  }) => posts_aggregate;
  posts_by_pk: (args: { id: ScalarsEnums["Int"] }) => Maybe<posts>;
  session?: Maybe<SessionOutput>;
  users: (args?: {
    distinct_on?: Array<ScalarsEnums["users_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => Array<users>;
  users_aggregate: (args?: {
    distinct_on?: Array<ScalarsEnums["users_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => users_aggregate;
  users_by_pk: (args: { id: ScalarsEnums["Int"] }) => Maybe<users>;
  votes: (args?: {
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  votes_aggregate: (args?: {
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
  votes_by_pk: (args: { id: ScalarsEnums["Int"] }) => Maybe<votes>;
}

export interface Mutation {
  __typename: "Mutation" | undefined;
  insert_posts: (args: { objects: Array<posts_insert_input> }) => Maybe<posts_mutation_response>;
  insert_posts_one: (args: { object: posts_insert_input }) => Maybe<posts>;
  vote: (args: { post_id: ScalarsEnums["Int"]; value: ScalarsEnums["smallint"] }) => VoteOutput;
}

export interface Subscription {
  __typename: "Subscription" | undefined;
  posts: (args?: {
    distinct_on?: Array<ScalarsEnums["posts_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<posts_order_by>>;
    where?: Maybe<posts_bool_exp>;
  }) => Array<posts>;
  posts_aggregate: (args?: {
    distinct_on?: Array<ScalarsEnums["posts_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<posts_order_by>>;
    where?: Maybe<posts_bool_exp>;
  }) => posts_aggregate;
  posts_by_pk: (args: { id: ScalarsEnums["Int"] }) => Maybe<posts>;
  session?: Maybe<SessionOutput>;
  users: (args?: {
    distinct_on?: Array<ScalarsEnums["users_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => Array<users>;
  users_aggregate: (args?: {
    distinct_on?: Array<ScalarsEnums["users_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => users_aggregate;
  users_by_pk: (args: { id: ScalarsEnums["Int"] }) => Maybe<users>;
  votes: (args?: {
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  votes_aggregate: (args?: {
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>;
    limit?: ScalarsEnums["Int"];
    offset?: ScalarsEnums["Int"];
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
  votes_by_pk: (args: { id: ScalarsEnums["Int"] }) => Maybe<votes>;
}

export interface SessionOutput {
  __typename: "SessionOutput" | undefined;
  role?: ScalarsEnums["String"];
  user?: Maybe<users>;
  user_id?: ScalarsEnums["Int"];
}

export interface VoteOutput {
  __typename: "VoteOutput" | undefined;
  vote?: Maybe<votes>;
  vote_id: ScalarsEnums["Int"];
}

/**
 * columns and relationships of "posts"
 */
export interface posts {
  __typename: "posts" | undefined;
  created_at: ScalarsEnums["timestamptz"];
  id: ScalarsEnums["Int"];
  /**
   * A computed field, executes function "get_post_my_vote_value"
   */
  my_vote_value?: ScalarsEnums["smallint"];
  title: ScalarsEnums["String"];
  updated_at: ScalarsEnums["timestamptz"];
  url: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  user?: Maybe<users>;
  user_id?: ScalarsEnums["Int"];
  /**
   * A computed field, executes function "get_post_vote_total"
   */
  vote_total?: ScalarsEnums["bigint"];
  /**
   * An array relationship
   */
  votes: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>
    /**
     * limit the number of rows returned
     */;
    limit?: ScalarsEnums["Int"]
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: ScalarsEnums["Int"]
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<votes_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  /**
   * An aggregated array relationship
   */
  votes_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>
    /**
     * limit the number of rows returned
     */;
    limit?: ScalarsEnums["Int"]
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: ScalarsEnums["Int"]
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<votes_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
}

/**
 * aggregated selection of "posts"
 */
export interface posts_aggregate {
  __typename: "posts_aggregate" | undefined;
  aggregate?: Maybe<posts_aggregate_fields>;
  nodes: Array<posts>;
}

/**
 * aggregate fields of "posts"
 */
export interface posts_aggregate_fields {
  __typename: "posts_aggregate_fields" | undefined;
  avg?: Maybe<posts_avg_fields>;
  count: (args?: {
    columns?: Array<ScalarsEnums["posts_select_column"]>;
    distinct?: ScalarsEnums["Boolean"];
  }) => ScalarsEnums["Int"];
  max?: Maybe<posts_max_fields>;
  min?: Maybe<posts_min_fields>;
  stddev?: Maybe<posts_stddev_fields>;
  stddev_pop?: Maybe<posts_stddev_pop_fields>;
  stddev_samp?: Maybe<posts_stddev_samp_fields>;
  sum?: Maybe<posts_sum_fields>;
  var_pop?: Maybe<posts_var_pop_fields>;
  var_samp?: Maybe<posts_var_samp_fields>;
  variance?: Maybe<posts_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface posts_avg_fields {
  __typename: "posts_avg_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * aggregate max on columns
 */
export interface posts_max_fields {
  __typename: "posts_max_fields" | undefined;
  created_at?: ScalarsEnums["timestamptz"];
  id?: ScalarsEnums["Int"];
  title?: ScalarsEnums["String"];
  updated_at?: ScalarsEnums["timestamptz"];
  url?: ScalarsEnums["String"];
  user_id?: ScalarsEnums["Int"];
}

/**
 * aggregate min on columns
 */
export interface posts_min_fields {
  __typename: "posts_min_fields" | undefined;
  created_at?: ScalarsEnums["timestamptz"];
  id?: ScalarsEnums["Int"];
  title?: ScalarsEnums["String"];
  updated_at?: ScalarsEnums["timestamptz"];
  url?: ScalarsEnums["String"];
  user_id?: ScalarsEnums["Int"];
}

/**
 * response of any mutation on the table "posts"
 */
export interface posts_mutation_response {
  __typename: "posts_mutation_response" | undefined;
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<posts>;
}

/**
 * aggregate stddev on columns
 */
export interface posts_stddev_fields {
  __typename: "posts_stddev_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * aggregate stddev_pop on columns
 */
export interface posts_stddev_pop_fields {
  __typename: "posts_stddev_pop_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * aggregate stddev_samp on columns
 */
export interface posts_stddev_samp_fields {
  __typename: "posts_stddev_samp_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * aggregate sum on columns
 */
export interface posts_sum_fields {
  __typename: "posts_sum_fields" | undefined;
  id?: ScalarsEnums["Int"];
  user_id?: ScalarsEnums["Int"];
}

/**
 * aggregate var_pop on columns
 */
export interface posts_var_pop_fields {
  __typename: "posts_var_pop_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * aggregate var_samp on columns
 */
export interface posts_var_samp_fields {
  __typename: "posts_var_samp_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * aggregate variance on columns
 */
export interface posts_variance_fields {
  __typename: "posts_variance_fields" | undefined;
  id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
}

/**
 * columns and relationships of "users"
 */
export interface users {
  __typename: "users" | undefined;
  created_at: ScalarsEnums["timestamptz"];
  email?: ScalarsEnums["String"];
  email_verified?: ScalarsEnums["timestamptz"];
  id: ScalarsEnums["Int"];
  image?: ScalarsEnums["String"];
  name?: ScalarsEnums["String"];
  /**
   * An array relationship
   */
  posts: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Array<ScalarsEnums["posts_select_column"]>
    /**
     * limit the number of rows returned
     */;
    limit?: ScalarsEnums["Int"]
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: ScalarsEnums["Int"]
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<posts_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<posts_bool_exp>;
  }) => Array<posts>;
  /**
   * An aggregated array relationship
   */
  posts_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Array<ScalarsEnums["posts_select_column"]>
    /**
     * limit the number of rows returned
     */;
    limit?: ScalarsEnums["Int"]
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: ScalarsEnums["Int"]
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<posts_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<posts_bool_exp>;
  }) => posts_aggregate;
  updated_at: ScalarsEnums["timestamptz"];
  /**
   * An array relationship
   */
  votes: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>
    /**
     * limit the number of rows returned
     */;
    limit?: ScalarsEnums["Int"]
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: ScalarsEnums["Int"]
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<votes_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  /**
   * An aggregated array relationship
   */
  votes_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Array<ScalarsEnums["votes_select_column"]>
    /**
     * limit the number of rows returned
     */;
    limit?: ScalarsEnums["Int"]
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: ScalarsEnums["Int"]
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<votes_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
}

/**
 * aggregated selection of "users"
 */
export interface users_aggregate {
  __typename: "users_aggregate" | undefined;
  aggregate?: Maybe<users_aggregate_fields>;
  nodes: Array<users>;
}

/**
 * aggregate fields of "users"
 */
export interface users_aggregate_fields {
  __typename: "users_aggregate_fields" | undefined;
  avg?: Maybe<users_avg_fields>;
  count: (args?: {
    columns?: Array<ScalarsEnums["users_select_column"]>;
    distinct?: ScalarsEnums["Boolean"];
  }) => ScalarsEnums["Int"];
  max?: Maybe<users_max_fields>;
  min?: Maybe<users_min_fields>;
  stddev?: Maybe<users_stddev_fields>;
  stddev_pop?: Maybe<users_stddev_pop_fields>;
  stddev_samp?: Maybe<users_stddev_samp_fields>;
  sum?: Maybe<users_sum_fields>;
  var_pop?: Maybe<users_var_pop_fields>;
  var_samp?: Maybe<users_var_samp_fields>;
  variance?: Maybe<users_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface users_avg_fields {
  __typename: "users_avg_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * aggregate max on columns
 */
export interface users_max_fields {
  __typename: "users_max_fields" | undefined;
  created_at?: ScalarsEnums["timestamptz"];
  email?: ScalarsEnums["String"];
  email_verified?: ScalarsEnums["timestamptz"];
  id?: ScalarsEnums["Int"];
  image?: ScalarsEnums["String"];
  name?: ScalarsEnums["String"];
  updated_at?: ScalarsEnums["timestamptz"];
}

/**
 * aggregate min on columns
 */
export interface users_min_fields {
  __typename: "users_min_fields" | undefined;
  created_at?: ScalarsEnums["timestamptz"];
  email?: ScalarsEnums["String"];
  email_verified?: ScalarsEnums["timestamptz"];
  id?: ScalarsEnums["Int"];
  image?: ScalarsEnums["String"];
  name?: ScalarsEnums["String"];
  updated_at?: ScalarsEnums["timestamptz"];
}

/**
 * aggregate stddev on columns
 */
export interface users_stddev_fields {
  __typename: "users_stddev_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * aggregate stddev_pop on columns
 */
export interface users_stddev_pop_fields {
  __typename: "users_stddev_pop_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * aggregate stddev_samp on columns
 */
export interface users_stddev_samp_fields {
  __typename: "users_stddev_samp_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * aggregate sum on columns
 */
export interface users_sum_fields {
  __typename: "users_sum_fields" | undefined;
  id?: ScalarsEnums["Int"];
}

/**
 * aggregate var_pop on columns
 */
export interface users_var_pop_fields {
  __typename: "users_var_pop_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * aggregate var_samp on columns
 */
export interface users_var_samp_fields {
  __typename: "users_var_samp_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * aggregate variance on columns
 */
export interface users_variance_fields {
  __typename: "users_variance_fields" | undefined;
  id?: ScalarsEnums["Float"];
}

/**
 * columns and relationships of "votes"
 */
export interface votes {
  __typename: "votes" | undefined;
  created_at: ScalarsEnums["timestamptz"];
  id: ScalarsEnums["Int"];
  /**
   * An object relationship
   */
  post: posts;
  post_id: ScalarsEnums["Int"];
  updated_at: ScalarsEnums["timestamptz"];
  /**
   * An object relationship
   */
  user: users;
  user_id: ScalarsEnums["Int"];
  value: ScalarsEnums["smallint"];
}

/**
 * aggregated selection of "votes"
 */
export interface votes_aggregate {
  __typename: "votes_aggregate" | undefined;
  aggregate?: Maybe<votes_aggregate_fields>;
  nodes: Array<votes>;
}

/**
 * aggregate fields of "votes"
 */
export interface votes_aggregate_fields {
  __typename: "votes_aggregate_fields" | undefined;
  avg?: Maybe<votes_avg_fields>;
  count: (args?: {
    columns?: Array<ScalarsEnums["votes_select_column"]>;
    distinct?: ScalarsEnums["Boolean"];
  }) => ScalarsEnums["Int"];
  max?: Maybe<votes_max_fields>;
  min?: Maybe<votes_min_fields>;
  stddev?: Maybe<votes_stddev_fields>;
  stddev_pop?: Maybe<votes_stddev_pop_fields>;
  stddev_samp?: Maybe<votes_stddev_samp_fields>;
  sum?: Maybe<votes_sum_fields>;
  var_pop?: Maybe<votes_var_pop_fields>;
  var_samp?: Maybe<votes_var_samp_fields>;
  variance?: Maybe<votes_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface votes_avg_fields {
  __typename: "votes_avg_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

/**
 * aggregate max on columns
 */
export interface votes_max_fields {
  __typename: "votes_max_fields" | undefined;
  created_at?: ScalarsEnums["timestamptz"];
  id?: ScalarsEnums["Int"];
  post_id?: ScalarsEnums["Int"];
  updated_at?: ScalarsEnums["timestamptz"];
  user_id?: ScalarsEnums["Int"];
  value?: ScalarsEnums["smallint"];
}

/**
 * aggregate min on columns
 */
export interface votes_min_fields {
  __typename: "votes_min_fields" | undefined;
  created_at?: ScalarsEnums["timestamptz"];
  id?: ScalarsEnums["Int"];
  post_id?: ScalarsEnums["Int"];
  updated_at?: ScalarsEnums["timestamptz"];
  user_id?: ScalarsEnums["Int"];
  value?: ScalarsEnums["smallint"];
}

/**
 * aggregate stddev on columns
 */
export interface votes_stddev_fields {
  __typename: "votes_stddev_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

/**
 * aggregate stddev_pop on columns
 */
export interface votes_stddev_pop_fields {
  __typename: "votes_stddev_pop_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

/**
 * aggregate stddev_samp on columns
 */
export interface votes_stddev_samp_fields {
  __typename: "votes_stddev_samp_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

/**
 * aggregate sum on columns
 */
export interface votes_sum_fields {
  __typename: "votes_sum_fields" | undefined;
  id?: ScalarsEnums["Int"];
  post_id?: ScalarsEnums["Int"];
  user_id?: ScalarsEnums["Int"];
  value?: ScalarsEnums["smallint"];
}

/**
 * aggregate var_pop on columns
 */
export interface votes_var_pop_fields {
  __typename: "votes_var_pop_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

/**
 * aggregate var_samp on columns
 */
export interface votes_var_samp_fields {
  __typename: "votes_var_samp_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

/**
 * aggregate variance on columns
 */
export interface votes_variance_fields {
  __typename: "votes_variance_fields" | undefined;
  id?: ScalarsEnums["Float"];
  post_id?: ScalarsEnums["Float"];
  user_id?: ScalarsEnums["Float"];
  value?: ScalarsEnums["Float"];
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  SessionOutput: SessionOutput;
  VoteOutput: VoteOutput;
  posts: posts;
  posts_aggregate: posts_aggregate;
  posts_aggregate_fields: posts_aggregate_fields;
  posts_avg_fields: posts_avg_fields;
  posts_max_fields: posts_max_fields;
  posts_min_fields: posts_min_fields;
  posts_mutation_response: posts_mutation_response;
  posts_stddev_fields: posts_stddev_fields;
  posts_stddev_pop_fields: posts_stddev_pop_fields;
  posts_stddev_samp_fields: posts_stddev_samp_fields;
  posts_sum_fields: posts_sum_fields;
  posts_var_pop_fields: posts_var_pop_fields;
  posts_var_samp_fields: posts_var_samp_fields;
  posts_variance_fields: posts_variance_fields;
  users: users;
  users_aggregate: users_aggregate;
  users_aggregate_fields: users_aggregate_fields;
  users_avg_fields: users_avg_fields;
  users_max_fields: users_max_fields;
  users_min_fields: users_min_fields;
  users_stddev_fields: users_stddev_fields;
  users_stddev_pop_fields: users_stddev_pop_fields;
  users_stddev_samp_fields: users_stddev_samp_fields;
  users_sum_fields: users_sum_fields;
  users_var_pop_fields: users_var_pop_fields;
  users_var_samp_fields: users_var_samp_fields;
  users_variance_fields: users_variance_fields;
  votes: votes;
  votes_aggregate: votes_aggregate;
  votes_aggregate_fields: votes_aggregate_fields;
  votes_avg_fields: votes_avg_fields;
  votes_max_fields: votes_max_fields;
  votes_min_fields: votes_min_fields;
  votes_stddev_fields: votes_stddev_fields;
  votes_stddev_pop_fields: votes_stddev_pop_fields;
  votes_stddev_samp_fields: votes_stddev_samp_fields;
  votes_sum_fields: votes_sum_fields;
  votes_var_pop_fields: votes_var_pop_fields;
  votes_var_samp_fields: votes_var_samp_fields;
  votes_variance_fields: votes_variance_fields;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "SessionOutput"
  | "VoteOutput"
  | "posts"
  | "posts_aggregate"
  | "posts_aggregate_fields"
  | "posts_avg_fields"
  | "posts_max_fields"
  | "posts_min_fields"
  | "posts_mutation_response"
  | "posts_stddev_fields"
  | "posts_stddev_pop_fields"
  | "posts_stddev_samp_fields"
  | "posts_sum_fields"
  | "posts_var_pop_fields"
  | "posts_var_samp_fields"
  | "posts_variance_fields"
  | "users"
  | "users_aggregate"
  | "users_aggregate_fields"
  | "users_avg_fields"
  | "users_max_fields"
  | "users_min_fields"
  | "users_stddev_fields"
  | "users_stddev_pop_fields"
  | "users_stddev_samp_fields"
  | "users_sum_fields"
  | "users_var_pop_fields"
  | "users_var_samp_fields"
  | "users_variance_fields"
  | "votes"
  | "votes_aggregate"
  | "votes_aggregate_fields"
  | "votes_avg_fields"
  | "votes_max_fields"
  | "votes_min_fields"
  | "votes_stddev_fields"
  | "votes_stddev_pop_fields"
  | "votes_stddev_samp_fields"
  | "votes_sum_fields"
  | "votes_var_pop_fields"
  | "votes_var_samp_fields"
  | "votes_variance_fields";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  order_by: order_by | undefined;
  posts_select_column: posts_select_column | undefined;
  users_select_column: users_select_column | undefined;
  votes_select_column: votes_select_column | undefined;
}
