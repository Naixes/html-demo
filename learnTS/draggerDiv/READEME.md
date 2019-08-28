## tsconfig.json

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
				"sourceMap": true,
				// 严格得检查空值
				"strictNullChecks": true
    }
}
```

.: 在当前目录运行，-c-1: 不缓存

`npx http-server . -c-1`