import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: number;
  smallint: number;
  timestamptz: string;
};


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

export type SessionOutput = {
  __typename?: 'SessionOutput';
  role?: Maybe<Scalars['String']>;
  /** An object relationship */
  user: Users;
  user_id?: Maybe<Scalars['Int']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

export type VoteOutput = {
  __typename?: 'VoteOutput';
  /** An object relationship */
  vote: Votes;
  vote_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert data into the table: "posts" */
  insert_posts?: Maybe<Posts_Mutation_Response>;
  /** insert a single row into the table: "posts" */
  insert_posts_one?: Maybe<Posts>;
  vote: VoteOutput;
};


/** mutation root */
export type Mutation_RootInsert_PostsArgs = {
  objects: Array<Posts_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
};


/** mutation root */
export type Mutation_RootVoteArgs = {
  post_id: Scalars['Int'];
  value: Scalars['smallint'];
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'posts';
  content: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** A computed field, executes function "get_post_my_vote_value" */
  my_vote_value?: Maybe<Scalars['smallint']>;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['Int']>;
  /** A computed field, executes function "get_post_vote_total" */
  vote_total?: Maybe<Scalars['bigint']>;
  /** fetch data from the table: "votes" */
  votes: Array<Votes>;
  /** An aggregate relationship */
  votes_aggregate: Votes_Aggregate;
};


/** columns and relationships of "posts" */
export type PostsVotesArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsVotes_AggregateArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};

/** aggregated selection of "posts" */
export type Posts_Aggregate = {
  __typename?: 'posts_aggregate';
  aggregate?: Maybe<Posts_Aggregate_Fields>;
  nodes: Array<Posts>;
};

/** aggregate fields of "posts" */
export type Posts_Aggregate_Fields = {
  __typename?: 'posts_aggregate_fields';
  avg?: Maybe<Posts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Posts_Max_Fields>;
  min?: Maybe<Posts_Min_Fields>;
  stddev?: Maybe<Posts_Stddev_Fields>;
  stddev_pop?: Maybe<Posts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Posts_Stddev_Samp_Fields>;
  sum?: Maybe<Posts_Sum_Fields>;
  var_pop?: Maybe<Posts_Var_Pop_Fields>;
  var_samp?: Maybe<Posts_Var_Samp_Fields>;
  variance?: Maybe<Posts_Variance_Fields>;
};


/** aggregate fields of "posts" */
export type Posts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Posts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "posts" */
export type Posts_Aggregate_Order_By = {
  avg?: Maybe<Posts_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Posts_Max_Order_By>;
  min?: Maybe<Posts_Min_Order_By>;
  stddev?: Maybe<Posts_Stddev_Order_By>;
  stddev_pop?: Maybe<Posts_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Posts_Stddev_Samp_Order_By>;
  sum?: Maybe<Posts_Sum_Order_By>;
  var_pop?: Maybe<Posts_Var_Pop_Order_By>;
  var_samp?: Maybe<Posts_Var_Samp_Order_By>;
  variance?: Maybe<Posts_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Posts_Avg_Fields = {
  __typename?: 'posts_avg_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "posts" */
export type Posts_Avg_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type Posts_Bool_Exp = {
  _and?: Maybe<Array<Posts_Bool_Exp>>;
  _not?: Maybe<Posts_Bool_Exp>;
  _or?: Maybe<Array<Posts_Bool_Exp>>;
  content?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
  votes?: Maybe<Votes_Bool_Exp>;
};

/** input type for inserting data into table "posts" */
export type Posts_Insert_Input = {
  content?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Posts_Max_Fields = {
  __typename?: 'posts_max_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "posts" */
export type Posts_Max_Order_By = {
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Posts_Min_Fields = {
  __typename?: 'posts_min_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "posts" */
export type Posts_Min_Order_By = {
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "posts" */
export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts>;
};

/** Ordering options when selecting data from "posts". */
export type Posts_Order_By = {
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
  votes_aggregate?: Maybe<Votes_Aggregate_Order_By>;
};

/** select columns of table "posts" */
export enum Posts_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate stddev on columns */
export type Posts_Stddev_Fields = {
  __typename?: 'posts_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "posts" */
export type Posts_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Posts_Stddev_Pop_Fields = {
  __typename?: 'posts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "posts" */
export type Posts_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Posts_Stddev_Samp_Fields = {
  __typename?: 'posts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "posts" */
export type Posts_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Posts_Sum_Fields = {
  __typename?: 'posts_sum_fields';
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "posts" */
export type Posts_Sum_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Posts_Var_Pop_Fields = {
  __typename?: 'posts_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "posts" */
export type Posts_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Posts_Var_Samp_Fields = {
  __typename?: 'posts_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "posts" */
export type Posts_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Posts_Variance_Fields = {
  __typename?: 'posts_variance_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "posts" */
export type Posts_Variance_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  session?: Maybe<SessionOutput>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "votes" */
  votes: Array<Votes>;
  /** An aggregate relationship */
  votes_aggregate: Votes_Aggregate;
  /** fetch data from the table: "votes" using primary key columns */
  votes_by_pk?: Maybe<Votes>;
};


export type Query_RootPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootVotesArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};


export type Query_RootVotes_AggregateArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};


export type Query_RootVotes_By_PkArgs = {
  id: Scalars['Int'];
};


/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: Maybe<Scalars['smallint']>;
  _gt?: Maybe<Scalars['smallint']>;
  _gte?: Maybe<Scalars['smallint']>;
  _in?: Maybe<Array<Scalars['smallint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['smallint']>;
  _lte?: Maybe<Scalars['smallint']>;
  _neq?: Maybe<Scalars['smallint']>;
  _nin?: Maybe<Array<Scalars['smallint']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "votes" */
  votes: Array<Votes>;
  /** An aggregate relationship */
  votes_aggregate: Votes_Aggregate;
  /** fetch data from the table: "votes" using primary key columns */
  votes_by_pk?: Maybe<Votes>;
};


export type Subscription_RootPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootVotesArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};


export type Subscription_RootVotes_AggregateArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};


export type Subscription_RootVotes_By_PkArgs = {
  id: Scalars['Int'];
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  updated_at: Scalars['timestamptz'];
  /** fetch data from the table: "votes" */
  votes: Array<Votes>;
  /** An aggregate relationship */
  votes_aggregate: Votes_Aggregate;
};


/** columns and relationships of "users" */
export type UsersPostsArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPosts_AggregateArgs = {
  distinct_on?: Maybe<Array<Posts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Posts_Order_By>>;
  where?: Maybe<Posts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersVotesArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersVotes_AggregateArgs = {
  distinct_on?: Maybe<Array<Votes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Votes_Order_By>>;
  where?: Maybe<Votes_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  email_verified?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  posts?: Maybe<Posts_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  votes?: Maybe<Votes_Bool_Exp>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  email_verified?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  posts_aggregate?: Maybe<Posts_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
  votes_aggregate?: Maybe<Votes_Aggregate_Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "votes" */
export type Votes = {
  __typename?: 'votes';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['Int'];
  value: Scalars['smallint'];
};

/** aggregated selection of "votes" */
export type Votes_Aggregate = {
  __typename?: 'votes_aggregate';
  aggregate?: Maybe<Votes_Aggregate_Fields>;
  nodes: Array<Votes>;
};

/** aggregate fields of "votes" */
export type Votes_Aggregate_Fields = {
  __typename?: 'votes_aggregate_fields';
  avg?: Maybe<Votes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Votes_Max_Fields>;
  min?: Maybe<Votes_Min_Fields>;
  stddev?: Maybe<Votes_Stddev_Fields>;
  stddev_pop?: Maybe<Votes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Votes_Stddev_Samp_Fields>;
  sum?: Maybe<Votes_Sum_Fields>;
  var_pop?: Maybe<Votes_Var_Pop_Fields>;
  var_samp?: Maybe<Votes_Var_Samp_Fields>;
  variance?: Maybe<Votes_Variance_Fields>;
};


/** aggregate fields of "votes" */
export type Votes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Votes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "votes" */
export type Votes_Aggregate_Order_By = {
  avg?: Maybe<Votes_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Votes_Max_Order_By>;
  min?: Maybe<Votes_Min_Order_By>;
  stddev?: Maybe<Votes_Stddev_Order_By>;
  stddev_pop?: Maybe<Votes_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Votes_Stddev_Samp_Order_By>;
  sum?: Maybe<Votes_Sum_Order_By>;
  var_pop?: Maybe<Votes_Var_Pop_Order_By>;
  var_samp?: Maybe<Votes_Var_Samp_Order_By>;
  variance?: Maybe<Votes_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Votes_Avg_Fields = {
  __typename?: 'votes_avg_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "votes" */
export type Votes_Avg_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "votes". All fields are combined with a logical 'AND'. */
export type Votes_Bool_Exp = {
  _and?: Maybe<Array<Votes_Bool_Exp>>;
  _not?: Maybe<Votes_Bool_Exp>;
  _or?: Maybe<Array<Votes_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  post?: Maybe<Posts_Bool_Exp>;
  post_id?: Maybe<Int_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
  value?: Maybe<Smallint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Votes_Max_Fields = {
  __typename?: 'votes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  post_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "votes" */
export type Votes_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Votes_Min_Fields = {
  __typename?: 'votes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  post_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "votes" */
export type Votes_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "votes". */
export type Votes_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  post?: Maybe<Posts_Order_By>;
  post_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** select columns of table "votes" */
export enum Votes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Votes_Stddev_Fields = {
  __typename?: 'votes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "votes" */
export type Votes_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Votes_Stddev_Pop_Fields = {
  __typename?: 'votes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "votes" */
export type Votes_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Votes_Stddev_Samp_Fields = {
  __typename?: 'votes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "votes" */
export type Votes_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Votes_Sum_Fields = {
  __typename?: 'votes_sum_fields';
  id?: Maybe<Scalars['Int']>;
  post_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "votes" */
export type Votes_Sum_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Votes_Var_Pop_Fields = {
  __typename?: 'votes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "votes" */
export type Votes_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Votes_Var_Samp_Fields = {
  __typename?: 'votes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "votes" */
export type Votes_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Votes_Variance_Fields = {
  __typename?: 'votes_variance_fields';
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "votes" */
export type Votes_Variance_Order_By = {
  id?: Maybe<Order_By>;
  post_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type PostFragment = (
  { __typename?: 'posts' }
  & Pick<Posts, 'id' | 'created_at' | 'content' | 'vote_total' | 'my_vote_value'>
  & { user?: Maybe<(
    { __typename?: 'users' }
    & UserInfoFragment
  )> }
);

export type UserInfoFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'id' | 'name' | 'image'>
);

export type InsertPostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type InsertPostMutation = (
  { __typename?: 'mutation_root' }
  & { insert_posts_one?: Maybe<(
    { __typename?: 'posts' }
    & PostFragment
  )> }
);

export type VoteMutationVariables = Exact<{
  post_id: Scalars['Int'];
  value: Scalars['smallint'];
}>;


export type VoteMutation = (
  { __typename?: 'mutation_root' }
  & { vote: (
    { __typename: 'VoteOutput' }
    & { vote: (
      { __typename: 'votes' }
      & { post: (
        { __typename: 'posts' }
        & Pick<Posts, 'id' | 'vote_total' | 'my_vote_value'>
      ) }
    ) }
  ) }
);

export type PostVotersQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type PostVotersQuery = (
  { __typename?: 'query_root' }
  & { posts_by_pk?: Maybe<(
    { __typename?: 'posts' }
    & Pick<Posts, 'id' | 'vote_total'>
    & { downvotes: Array<(
      { __typename?: 'votes' }
      & { user: (
        { __typename?: 'users' }
        & UserInfoFragment
      ) }
    )>, upvotes: Array<(
      { __typename?: 'votes' }
      & { user: (
        { __typename?: 'users' }
        & UserInfoFragment
      ) }
    )> }
  )> }
);

export type PostsQueryVariables = Exact<{
  where: Posts_Bool_Exp;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'query_root' }
  & { posts: Array<(
    { __typename?: 'posts' }
    & PostFragment
  )>, posts_aggregate: (
    { __typename?: 'posts_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'posts_aggregate_fields' }
      & Pick<Posts_Aggregate_Fields, 'count'>
    )> }
  ) }
);

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'query_root' }
  & { session?: Maybe<(
    { __typename?: 'SessionOutput' }
    & { user: (
      { __typename?: 'users' }
      & UserInfoFragment
    ) }
  )> }
);

export type UserDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserDetailsQuery = (
  { __typename?: 'query_root' }
  & { users_by_pk?: Maybe<(
    { __typename?: 'users' }
    & Pick<Users, 'created_at'>
    & { upvotes_aggregate: (
      { __typename?: 'votes_aggregate' }
      & { aggregate?: Maybe<(
        { __typename?: 'votes_aggregate_fields' }
        & Pick<Votes_Aggregate_Fields, 'count'>
      )> }
    ), downvotes_aggregate: (
      { __typename?: 'votes_aggregate' }
      & { aggregate?: Maybe<(
        { __typename?: 'votes_aggregate_fields' }
        & Pick<Votes_Aggregate_Fields, 'count'>
      )> }
    ) }
    & UserInfoFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & { posts_aggregate: (
      { __typename?: 'posts_aggregate' }
      & { aggregate?: Maybe<(
        { __typename?: 'posts_aggregate_fields' }
        & Pick<Posts_Aggregate_Fields, 'count'>
      )> }
    ) }
    & UserInfoFragment
  )> }
);

export const UserInfoFragmentDoc: DocumentNode<UserInfoFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]};
export const PostFragmentDoc: DocumentNode<PostFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Post"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"posts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"vote_total"}},{"kind":"Field","name":{"kind":"Name","value":"my_vote_value"}}]}},...UserInfoFragmentDoc.definitions]};
export const InsertPostDocument: DocumentNode<InsertPostMutation, InsertPostMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_posts_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Post"}}]}}]}},...PostFragmentDoc.definitions]};
export const VoteDocument: DocumentNode<VoteMutation, VoteMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Vote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"smallint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"post_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"vote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vote_total"}},{"kind":"Field","name":{"kind":"Name","value":"my_vote_value"}}]}}]}}]}}]}}]};
export const PostVotersDocument: DocumentNode<PostVotersQuery, PostVotersQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostVoters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vote_total"}},{"kind":"Field","alias":{"kind":"Name","value":"downvotes"},"name":{"kind":"Name","value":"votes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"IntValue","value":"-1"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"updated_at"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"upvotes"},"name":{"kind":"Name","value":"votes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"IntValue","value":"1"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"updated_at"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}}]}}]}},...UserInfoFragmentDoc.definitions]};
export const PostsDocument: DocumentNode<PostsQuery, PostsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"posts_bool_exp"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Post"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},...PostFragmentDoc.definitions]};
export const SessionDocument: DocumentNode<SessionQuery, SessionQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}}]}},...UserInfoFragmentDoc.definitions]};
export const UserDetailsDocument: DocumentNode<UserDetailsQuery, UserDetailsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","alias":{"kind":"Name","value":"upvotes_aggregate"},"name":{"kind":"Name","value":"votes_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"IntValue","value":"1"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"downvotes_aggregate"},"name":{"kind":"Name","value":"votes_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"IntValue","value":"-1"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}},...UserInfoFragmentDoc.definitions]};
export const UsersDocument: DocumentNode<UsersQuery, UsersQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}},{"kind":"Field","name":{"kind":"Name","value":"posts_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}},...UserInfoFragmentDoc.definitions]};