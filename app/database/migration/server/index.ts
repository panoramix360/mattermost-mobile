// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// NOTE : To implement migration, please follow this document
// https://nozbe.github.io/WatermelonDB/Advanced/Migrations.html

import {addColumns, createTable, schemaMigrations, unsafeExecuteSql} from '@nozbe/watermelondb/Schema/migrations';

import {MM_TABLES} from '@constants/database';

const {CHANNEL_BOOKMARK, CHANNEL_INFO, DRAFT, POST, CHANNEL, CUSTOM_PROFILE_ATTRIBUTE, CUSTOM_PROFILE_FIELD} = MM_TABLES.SERVER;

export default schemaMigrations({migrations: [
    {
        toVersion: 8,
        steps: [
            createTable({
                name: CUSTOM_PROFILE_ATTRIBUTE,
                columns: [
                    {name: 'field_id', type: 'string', isIndexed: true},
                    {name: 'user_id', type: 'string', isIndexed: true},
                    {name: 'value', type: 'string'},
                ],
            }),
            createTable({
                name: CUSTOM_PROFILE_FIELD,
                columns: [
                    {name: 'group_id', type: 'string', isIndexed: true},
                    {name: 'name', type: 'string'},
                    {name: 'type', type: 'string'},
                    {name: 'target_id', type: 'string'},
                    {name: 'target_type', type: 'string'},
                    {name: 'create_at', type: 'number'},
                    {name: 'update_at', type: 'number'},
                    {name: 'delete_at', type: 'number', isOptional: true},
                    {name: 'attrs', type: 'string', isOptional: true},
                ],
            }),
        ],
    },
    {
        toVersion: 7,
        steps: [
            addColumns({
                table: CHANNEL,
                columns: [
                    {name: 'banner_info', type: 'string', isOptional: true},
                ],
            }),
        ],
    },
    {
        toVersion: 6,
        steps: [
            unsafeExecuteSql('CREATE INDEX IF NOT EXISTS Post_type ON Post (type);'),
        ],
    },
    {
        toVersion: 5,
        steps: [
            addColumns({
                table: DRAFT,
                columns: [
                    {name: 'update_at', type: 'number'},
                ],
            }),
        ],
    },
    {
        toVersion: 4,
        steps: [
            createTable({
                name: CHANNEL_BOOKMARK,
                columns: [
                    {name: 'create_at', type: 'number'},
                    {name: 'update_at', type: 'number'},
                    {name: 'delete_at', type: 'number'},
                    {name: 'channel_id', type: 'string', isIndexed: true},
                    {name: 'owner_id', type: 'string'},
                    {name: 'file_id', type: 'string', isOptional: true},
                    {name: 'display_name', type: 'string'},
                    {name: 'sort_order', type: 'number'},
                    {name: 'link_url', type: 'string', isOptional: true},
                    {name: 'image_url', type: 'string', isOptional: true},
                    {name: 'emoji', type: 'string', isOptional: true},
                    {name: 'type', type: 'string'},
                    {name: 'original_id', type: 'string', isOptional: true},
                    {name: 'parent_id', type: 'string', isOptional: true},
                ],
            }),
        ],
    },
    {
        toVersion: 3,
        steps: [
            addColumns({
                table: POST,
                columns: [
                    {name: 'message_source', type: 'string'},
                ],
            }),
        ],
    },
    {
        toVersion: 2,
        steps: [
            addColumns({
                table: CHANNEL_INFO,
                columns: [
                    {name: 'files_count', type: 'number'},
                ],
            }),
            addColumns({
                table: DRAFT,
                columns: [
                    {name: 'metadata', type: 'string', isOptional: true},
                ],
            }),
        ],
    },
]});
