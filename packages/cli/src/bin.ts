#!/usr/bin/env node

import { compile } from "./compile";

const schema = process.argv[2] || process.env.SCHEMA_URL;

compile({ schema });
