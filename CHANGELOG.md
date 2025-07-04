## [1.2.1](https://github.com/kanaru0928/vrc-browser-chat/compare/v1.2.0...v1.2.1) (2025-07-01)


### Bug Fixes

* prevent multiple activation ([#35](https://github.com/kanaru0928/vrc-browser-chat/issues/35)) ([1cb1814](https://github.com/kanaru0928/vrc-browser-chat/commit/1cb1814dce4d9279b14858451a4ee103b032b1f2))

# [1.2.0](https://github.com/kanaru0928/vrc-browser-chat/compare/v1.1.0...v1.2.0) (2025-06-21)


### Bug Fixes

* include license in the information dialog ([db826a6](https://github.com/kanaru0928/vrc-browser-chat/commit/db826a6e0cd6aa94e3e8765ae20ea82783f883b9))
* update title of web interface ([7535841](https://github.com/kanaru0928/vrc-browser-chat/commit/7535841c9b5f03d0eb61fc0b5d033d03288f74f6))


### Features

* implement startup update check ([81e8eb6](https://github.com/kanaru0928/vrc-browser-chat/commit/81e8eb6784f66de638a763ffb9cce54e41be6eec))

# [1.1.0](https://github.com/kanaru0928/vrc-browser-chat/compare/v1.0.0...v1.1.0) (2025-06-20)


### Bug Fixes

* add environment variable ([d14657d](https://github.com/kanaru0928/vrc-browser-chat/commit/d14657df8485cb87e86f4d7a8494964a120a4b28))
* solve double sending ([e30c720](https://github.com/kanaru0928/vrc-browser-chat/commit/e30c7205565ef2a5586042a8883f468aad3ff8cd))
* update so that  chats will be send ([fc47fc5](https://github.com/kanaru0928/vrc-browser-chat/commit/fc47fc5085cdbf7758285157817bc0f73ebc00dd))


### Features

* add issue templates ([75f9717](https://github.com/kanaru0928/vrc-browser-chat/commit/75f97170d6aacbb033dcdf8e7e0d001f805aecc7))
* add pull request template ([c79c603](https://github.com/kanaru0928/vrc-browser-chat/commit/c79c6032c959462d3210c0a0e3cade83d678e077))

# 1.0.0 (2025-06-19)


### Bug Fixes

* add caching for pnpm store and Rust dependencies in workflows ([ecd5c9c](https://github.com/kanaru0928/vrc-browser-chat/commit/ecd5c9cd5eb56d40c94073ed0d0395ff30e3040e))
* add gitCommitOptions to semantic-release configuration ([74fa69c](https://github.com/kanaru0928/vrc-browser-chat/commit/74fa69c34f06fcd999c8f5a7adeccc420a7e347f))
* add permissions for issues in release workflow ([cbea03a](https://github.com/kanaru0928/vrc-browser-chat/commit/cbea03a5ddf505f858adbd565c539a90d435ecc9))
* add TAURI_SIGNING_PRIVATE_KEY_PASSWORD environment variable and clean up tauri.conf.json ([fd47149](https://github.com/kanaru0928/vrc-browser-chat/commit/fd47149e25bc5486ec142ded17b292a76e725d6f))
* changed semantic release ([7bccbc4](https://github.com/kanaru0928/vrc-browser-chat/commit/7bccbc44ae746807fdf00a54b6954579370d14c8))
* clean up tauri configuration ([200a430](https://github.com/kanaru0928/vrc-browser-chat/commit/200a4308c5dfcdf03c2c5d55b57530fdebf236b6))
* correct environment variable name for Tauri signing key ([177dabc](https://github.com/kanaru0928/vrc-browser-chat/commit/177dabc41dfd55d292efbb5ac328e8ee16537c44))
* disable husky during release workflow ([871fc15](https://github.com/kanaru0928/vrc-browser-chat/commit/871fc15060bfe7ed0a2712b608714b50e4ad4a72))
* enable build ([306ba72](https://github.com/kanaru0928/vrc-browser-chat/commit/306ba72bd897643172b7da8abc9442f61293bbe3))
* fix pnpm workspace settings ([28000b7](https://github.com/kanaru0928/vrc-browser-chat/commit/28000b76120201d41c94922376a505f4a671d804))
* fixed updater dependencies ([bae2fd4](https://github.com/kanaru0928/vrc-browser-chat/commit/bae2fd4c716752d9ba63b152f0c4f0997ad3bf94))
* made a build passes ([f6ba8e9](https://github.com/kanaru0928/vrc-browser-chat/commit/f6ba8e9395731432a0992ce393ca2443b34995ea))
* remove conditional check for new release publication in build job ([8473587](https://github.com/kanaru0928/vrc-browser-chat/commit/8473587236c21112e94d8a35ddec524912ed1c92))
* remove GitHub plugin configuration from release settings ([e9179d7](https://github.com/kanaru0928/vrc-browser-chat/commit/e9179d775332de7e5255f30b6412f8a7500fe55c))
* remove node-version specification in Node.js setup ([0353930](https://github.com/kanaru0928/vrc-browser-chat/commit/03539300772ea6a06f145fc22ac370d8f0729c39))
* remove push trigger from release workflow ([5e3f651](https://github.com/kanaru0928/vrc-browser-chat/commit/5e3f651feb36da506db29150317f897f37b12939))
* remove release notes from commit message in semantic-release configuration ([763136f](https://github.com/kanaru0928/vrc-browser-chat/commit/763136fed84349e8d4242c055eb9dd00dca07b98))
* remove tagFormat option and adjust GitHub plugin configuration ([5561ac4](https://github.com/kanaru0928/vrc-browser-chat/commit/5561ac4d57bce383cda0b9a6abde072615d80a17))
* remove unused output from semantic-release job and adjust build step reference ([f4310d4](https://github.com/kanaru0928/vrc-browser-chat/commit/f4310d48d30b0f3e5095863e3dd96ded27e36d77))
* remove unused outputs and references in release workflow ([6a9ca4d](https://github.com/kanaru0928/vrc-browser-chat/commit/6a9ca4d5c1fdee2906eba96355cd5be0e8aba695))
* simplify linting command in build check workflow ([44b121b](https://github.com/kanaru0928/vrc-browser-chat/commit/44b121b39943f54f48510f52a837f7e8a22e61e7))
* update eslint settings ([676b194](https://github.com/kanaru0928/vrc-browser-chat/commit/676b1946b6aae052cab2e92db3487d16a7400b8c))
* update pull request paths in build check workflow ([a16b2da](https://github.com/kanaru0928/vrc-browser-chat/commit/a16b2dab3b5f01a733e775a71acd69d9fd48df45))
* update release configuration to include git plugin for changelog and versioning ([39a36b6](https://github.com/kanaru0928/vrc-browser-chat/commit/39a36b648e9660b5d164a3ad1b30d46df3beae9d))
* update release workflow and configuration for semantic release ([45b4085](https://github.com/kanaru0928/vrc-browser-chat/commit/45b40851d77b8efcde6bd064ebf495119181b719))
* update release workflow to include new outputs and conditional checks ([e4fef23](https://github.com/kanaru0928/vrc-browser-chat/commit/e4fef231d6d51e8e6b68bc81f01dbd6cf157c963))
* update release workflow to upload build artifacts with version tagging ([03b94ff](https://github.com/kanaru0928/vrc-browser-chat/commit/03b94ff10bdc2124a1c5e8d9fc36961d50606e29))
* update release workflow trigger and permissions ([322b879](https://github.com/kanaru0928/vrc-browser-chat/commit/322b87993328856d8e14ecd21b289cfeac68374f))
* update Rust caching strategy and remove unused release notes step ([edaf869](https://github.com/kanaru0928/vrc-browser-chat/commit/edaf869830ff46072ccbab3be13d54fc127bd6d1))
* update semantic-release job to correctly output release notes and version ([4fc5bd3](https://github.com/kanaru0928/vrc-browser-chat/commit/4fc5bd381413b9ae1cb143c2af41b64a14c0a820))
* updated version number retrieval ([cbceb99](https://github.com/kanaru0928/vrc-browser-chat/commit/cbceb99fcfb31de911e63cd3397b5e16bfe86129))


### Features

* add build check workflow for CI/CD ([0757e34](https://github.com/kanaru0928/vrc-browser-chat/commit/0757e341ada8d1a1ea9d4f16b6a9bc728e9af480))
* add chat functionality with message handling and UI updates ([d8f3cab](https://github.com/kanaru0928/vrc-browser-chat/commit/d8f3cabdcbf597d323ee903c036b66b97e1a922e))
* add pnpm workspace configuration for server and web packages ([6803fbd](https://github.com/kanaru0928/vrc-browser-chat/commit/6803fbd6e2edbf441f069502689055893a655eb2))
* add release workflow with semantic-release and build steps ([546311f](https://github.com/kanaru0928/vrc-browser-chat/commit/546311f7a90965ca4f602e4033168e93763077dd))
* add server port configuration and enhance server error handling ([d80f07d](https://github.com/kanaru0928/vrc-browser-chat/commit/d80f07dce223fca8edcd77f29aa1a94cfde19bf8))
* add version display and footer to the main app layout ([77a8529](https://github.com/kanaru0928/vrc-browser-chat/commit/77a852954250f06a9f3375127250a70785564aec))
* adjusted ui around web server ([ec77439](https://github.com/kanaru0928/vrc-browser-chat/commit/ec77439b70c84e9b2907c5117ef688107ecf1deb))
* created chatbox endpoint ([74822ef](https://github.com/kanaru0928/vrc-browser-chat/commit/74822efe360ca8afcde669e51cee9bcb36374ae7))
* created status ([9968b73](https://github.com/kanaru0928/vrc-browser-chat/commit/9968b73251100592e5f0a86c4356fa66097dce2f))
* created ui ([22ae5d1](https://github.com/kanaru0928/vrc-browser-chat/commit/22ae5d1944e0b7a845720e5fe304392013aa17e2))
* created ui ([bcb8b50](https://github.com/kanaru0928/vrc-browser-chat/commit/bcb8b505b04e4a4dc895c9572cb37ac3c5eaeef1))
* enhance OSC connection handling and UI feedback ([2936da7](https://github.com/kanaru0928/vrc-browser-chat/commit/2936da772e2dcc4818f4e6aa6af792b9e5fc033a))
* implement web server start and stop commands with UI integration ([b35fe7d](https://github.com/kanaru0928/vrc-browser-chat/commit/b35fe7d62a77e63af23374287ca6e7bde564c8a8))
* implemented logic ([89226a5](https://github.com/kanaru0928/vrc-browser-chat/commit/89226a5a392dfa2cbfa7dc929fdae479f03bed7b))
* implemented update ([8c00003](https://github.com/kanaru0928/vrc-browser-chat/commit/8c0000397d87a26f82b79912dea6352ee9060948))
* initialized nextjs ([14e0aee](https://github.com/kanaru0928/vrc-browser-chat/commit/14e0aeeda9bf26f01bf9febde7ec1f9a66df119e))
* initialized shadcn ([34fdcb3](https://github.com/kanaru0928/vrc-browser-chat/commit/34fdcb3d432662e2ebd95d58fd0abdfc2533cddc))
* initialized tauri app ([4d94b53](https://github.com/kanaru0928/vrc-browser-chat/commit/4d94b53ef8408cb2ff9ceec4dd961e5a21a60a6e))
* initialized ui component of tauri ([1bf1940](https://github.com/kanaru0928/vrc-browser-chat/commit/1bf1940197dd06b92e196320bc34a819e8a82cb3))
* integrated next and tauri ([3412b7f](https://github.com/kanaru0928/vrc-browser-chat/commit/3412b7f82a4185b152ac085a724076a8c69cd2e4))
* oscを実装 ([f78cf9d](https://github.com/kanaru0928/vrc-browser-chat/commit/f78cf9dd5d74c737ef105f3cea6e6c382aa6d623))
* setup husky ([37116ef](https://github.com/kanaru0928/vrc-browser-chat/commit/37116efa4828a989ade3b83ab7afe6e535a58ffa))

# 1.0.0 (2025-06-19)


### Bug Fixes

* add caching for pnpm store and Rust dependencies in workflows ([ecd5c9c](https://github.com/kanaru0928/vrc-browser-chat/commit/ecd5c9cd5eb56d40c94073ed0d0395ff30e3040e))
* add gitCommitOptions to semantic-release configuration ([74fa69c](https://github.com/kanaru0928/vrc-browser-chat/commit/74fa69c34f06fcd999c8f5a7adeccc420a7e347f))
* add permissions for issues in release workflow ([cbea03a](https://github.com/kanaru0928/vrc-browser-chat/commit/cbea03a5ddf505f858adbd565c539a90d435ecc9))
* changed semantic release ([7bccbc4](https://github.com/kanaru0928/vrc-browser-chat/commit/7bccbc44ae746807fdf00a54b6954579370d14c8))
* clean up tauri configuration ([200a430](https://github.com/kanaru0928/vrc-browser-chat/commit/200a4308c5dfcdf03c2c5d55b57530fdebf236b6))
* correct environment variable name for Tauri signing key ([177dabc](https://github.com/kanaru0928/vrc-browser-chat/commit/177dabc41dfd55d292efbb5ac328e8ee16537c44))
* disable husky during release workflow ([871fc15](https://github.com/kanaru0928/vrc-browser-chat/commit/871fc15060bfe7ed0a2712b608714b50e4ad4a72))
* enable build ([306ba72](https://github.com/kanaru0928/vrc-browser-chat/commit/306ba72bd897643172b7da8abc9442f61293bbe3))
* fix pnpm workspace settings ([28000b7](https://github.com/kanaru0928/vrc-browser-chat/commit/28000b76120201d41c94922376a505f4a671d804))
* fixed updater dependencies ([bae2fd4](https://github.com/kanaru0928/vrc-browser-chat/commit/bae2fd4c716752d9ba63b152f0c4f0997ad3bf94))
* made a build passes ([f6ba8e9](https://github.com/kanaru0928/vrc-browser-chat/commit/f6ba8e9395731432a0992ce393ca2443b34995ea))
* remove conditional check for new release publication in build job ([8473587](https://github.com/kanaru0928/vrc-browser-chat/commit/8473587236c21112e94d8a35ddec524912ed1c92))
* remove GitHub plugin configuration from release settings ([e9179d7](https://github.com/kanaru0928/vrc-browser-chat/commit/e9179d775332de7e5255f30b6412f8a7500fe55c))
* remove node-version specification in Node.js setup ([0353930](https://github.com/kanaru0928/vrc-browser-chat/commit/03539300772ea6a06f145fc22ac370d8f0729c39))
* remove push trigger from release workflow ([5e3f651](https://github.com/kanaru0928/vrc-browser-chat/commit/5e3f651feb36da506db29150317f897f37b12939))
* remove release notes from commit message in semantic-release configuration ([763136f](https://github.com/kanaru0928/vrc-browser-chat/commit/763136fed84349e8d4242c055eb9dd00dca07b98))
* remove tagFormat option and adjust GitHub plugin configuration ([5561ac4](https://github.com/kanaru0928/vrc-browser-chat/commit/5561ac4d57bce383cda0b9a6abde072615d80a17))
* remove unused output from semantic-release job and adjust build step reference ([f4310d4](https://github.com/kanaru0928/vrc-browser-chat/commit/f4310d48d30b0f3e5095863e3dd96ded27e36d77))
* remove unused outputs and references in release workflow ([6a9ca4d](https://github.com/kanaru0928/vrc-browser-chat/commit/6a9ca4d5c1fdee2906eba96355cd5be0e8aba695))
* simplify linting command in build check workflow ([44b121b](https://github.com/kanaru0928/vrc-browser-chat/commit/44b121b39943f54f48510f52a837f7e8a22e61e7))
* update eslint settings ([676b194](https://github.com/kanaru0928/vrc-browser-chat/commit/676b1946b6aae052cab2e92db3487d16a7400b8c))
* update pull request paths in build check workflow ([a16b2da](https://github.com/kanaru0928/vrc-browser-chat/commit/a16b2dab3b5f01a733e775a71acd69d9fd48df45))
* update release configuration to include git plugin for changelog and versioning ([39a36b6](https://github.com/kanaru0928/vrc-browser-chat/commit/39a36b648e9660b5d164a3ad1b30d46df3beae9d))
* update release workflow and configuration for semantic release ([45b4085](https://github.com/kanaru0928/vrc-browser-chat/commit/45b40851d77b8efcde6bd064ebf495119181b719))
* update release workflow to include new outputs and conditional checks ([e4fef23](https://github.com/kanaru0928/vrc-browser-chat/commit/e4fef231d6d51e8e6b68bc81f01dbd6cf157c963))
* update release workflow to upload build artifacts with version tagging ([03b94ff](https://github.com/kanaru0928/vrc-browser-chat/commit/03b94ff10bdc2124a1c5e8d9fc36961d50606e29))
* update release workflow trigger and permissions ([322b879](https://github.com/kanaru0928/vrc-browser-chat/commit/322b87993328856d8e14ecd21b289cfeac68374f))
* update Rust caching strategy and remove unused release notes step ([edaf869](https://github.com/kanaru0928/vrc-browser-chat/commit/edaf869830ff46072ccbab3be13d54fc127bd6d1))
* update semantic-release job to correctly output release notes and version ([4fc5bd3](https://github.com/kanaru0928/vrc-browser-chat/commit/4fc5bd381413b9ae1cb143c2af41b64a14c0a820))
* updated version number retrieval ([cbceb99](https://github.com/kanaru0928/vrc-browser-chat/commit/cbceb99fcfb31de911e63cd3397b5e16bfe86129))


### Features

* add build check workflow for CI/CD ([0757e34](https://github.com/kanaru0928/vrc-browser-chat/commit/0757e341ada8d1a1ea9d4f16b6a9bc728e9af480))
* add chat functionality with message handling and UI updates ([d8f3cab](https://github.com/kanaru0928/vrc-browser-chat/commit/d8f3cabdcbf597d323ee903c036b66b97e1a922e))
* add pnpm workspace configuration for server and web packages ([6803fbd](https://github.com/kanaru0928/vrc-browser-chat/commit/6803fbd6e2edbf441f069502689055893a655eb2))
* add release workflow with semantic-release and build steps ([546311f](https://github.com/kanaru0928/vrc-browser-chat/commit/546311f7a90965ca4f602e4033168e93763077dd))
* add server port configuration and enhance server error handling ([d80f07d](https://github.com/kanaru0928/vrc-browser-chat/commit/d80f07dce223fca8edcd77f29aa1a94cfde19bf8))
* add version display and footer to the main app layout ([77a8529](https://github.com/kanaru0928/vrc-browser-chat/commit/77a852954250f06a9f3375127250a70785564aec))
* adjusted ui around web server ([ec77439](https://github.com/kanaru0928/vrc-browser-chat/commit/ec77439b70c84e9b2907c5117ef688107ecf1deb))
* created chatbox endpoint ([74822ef](https://github.com/kanaru0928/vrc-browser-chat/commit/74822efe360ca8afcde669e51cee9bcb36374ae7))
* created status ([9968b73](https://github.com/kanaru0928/vrc-browser-chat/commit/9968b73251100592e5f0a86c4356fa66097dce2f))
* created ui ([22ae5d1](https://github.com/kanaru0928/vrc-browser-chat/commit/22ae5d1944e0b7a845720e5fe304392013aa17e2))
* created ui ([bcb8b50](https://github.com/kanaru0928/vrc-browser-chat/commit/bcb8b505b04e4a4dc895c9572cb37ac3c5eaeef1))
* enhance OSC connection handling and UI feedback ([2936da7](https://github.com/kanaru0928/vrc-browser-chat/commit/2936da772e2dcc4818f4e6aa6af792b9e5fc033a))
* implement web server start and stop commands with UI integration ([b35fe7d](https://github.com/kanaru0928/vrc-browser-chat/commit/b35fe7d62a77e63af23374287ca6e7bde564c8a8))
* implemented logic ([89226a5](https://github.com/kanaru0928/vrc-browser-chat/commit/89226a5a392dfa2cbfa7dc929fdae479f03bed7b))
* implemented update ([8c00003](https://github.com/kanaru0928/vrc-browser-chat/commit/8c0000397d87a26f82b79912dea6352ee9060948))
* initialized nextjs ([14e0aee](https://github.com/kanaru0928/vrc-browser-chat/commit/14e0aeeda9bf26f01bf9febde7ec1f9a66df119e))
* initialized shadcn ([34fdcb3](https://github.com/kanaru0928/vrc-browser-chat/commit/34fdcb3d432662e2ebd95d58fd0abdfc2533cddc))
* initialized tauri app ([4d94b53](https://github.com/kanaru0928/vrc-browser-chat/commit/4d94b53ef8408cb2ff9ceec4dd961e5a21a60a6e))
* initialized ui component of tauri ([1bf1940](https://github.com/kanaru0928/vrc-browser-chat/commit/1bf1940197dd06b92e196320bc34a819e8a82cb3))
* integrated next and tauri ([3412b7f](https://github.com/kanaru0928/vrc-browser-chat/commit/3412b7f82a4185b152ac085a724076a8c69cd2e4))
* oscを実装 ([f78cf9d](https://github.com/kanaru0928/vrc-browser-chat/commit/f78cf9dd5d74c737ef105f3cea6e6c382aa6d623))
* setup husky ([37116ef](https://github.com/kanaru0928/vrc-browser-chat/commit/37116efa4828a989ade3b83ab7afe6e535a58ffa))

# 1.0.0 (2025-06-19)


### Bug Fixes

* add caching for pnpm store and Rust dependencies in workflows ([ecd5c9c](https://github.com/kanaru0928/vrc-browser-chat/commit/ecd5c9cd5eb56d40c94073ed0d0395ff30e3040e))
* add gitCommitOptions to semantic-release configuration ([74fa69c](https://github.com/kanaru0928/vrc-browser-chat/commit/74fa69c34f06fcd999c8f5a7adeccc420a7e347f))
* add permissions for issues in release workflow ([cbea03a](https://github.com/kanaru0928/vrc-browser-chat/commit/cbea03a5ddf505f858adbd565c539a90d435ecc9))
* changed semantic release ([7bccbc4](https://github.com/kanaru0928/vrc-browser-chat/commit/7bccbc44ae746807fdf00a54b6954579370d14c8))
* clean up tauri configuration ([200a430](https://github.com/kanaru0928/vrc-browser-chat/commit/200a4308c5dfcdf03c2c5d55b57530fdebf236b6))
* disable husky during release workflow ([871fc15](https://github.com/kanaru0928/vrc-browser-chat/commit/871fc15060bfe7ed0a2712b608714b50e4ad4a72))
* enable build ([306ba72](https://github.com/kanaru0928/vrc-browser-chat/commit/306ba72bd897643172b7da8abc9442f61293bbe3))
* fix pnpm workspace settings ([28000b7](https://github.com/kanaru0928/vrc-browser-chat/commit/28000b76120201d41c94922376a505f4a671d804))
* fixed updater dependencies ([bae2fd4](https://github.com/kanaru0928/vrc-browser-chat/commit/bae2fd4c716752d9ba63b152f0c4f0997ad3bf94))
* made a build passes ([f6ba8e9](https://github.com/kanaru0928/vrc-browser-chat/commit/f6ba8e9395731432a0992ce393ca2443b34995ea))
* remove conditional check for new release publication in build job ([8473587](https://github.com/kanaru0928/vrc-browser-chat/commit/8473587236c21112e94d8a35ddec524912ed1c92))
* remove GitHub plugin configuration from release settings ([e9179d7](https://github.com/kanaru0928/vrc-browser-chat/commit/e9179d775332de7e5255f30b6412f8a7500fe55c))
* remove node-version specification in Node.js setup ([0353930](https://github.com/kanaru0928/vrc-browser-chat/commit/03539300772ea6a06f145fc22ac370d8f0729c39))
* remove push trigger from release workflow ([5e3f651](https://github.com/kanaru0928/vrc-browser-chat/commit/5e3f651feb36da506db29150317f897f37b12939))
* remove release notes from commit message in semantic-release configuration ([763136f](https://github.com/kanaru0928/vrc-browser-chat/commit/763136fed84349e8d4242c055eb9dd00dca07b98))
* remove tagFormat option and adjust GitHub plugin configuration ([5561ac4](https://github.com/kanaru0928/vrc-browser-chat/commit/5561ac4d57bce383cda0b9a6abde072615d80a17))
* remove unused output from semantic-release job and adjust build step reference ([f4310d4](https://github.com/kanaru0928/vrc-browser-chat/commit/f4310d48d30b0f3e5095863e3dd96ded27e36d77))
* remove unused outputs and references in release workflow ([6a9ca4d](https://github.com/kanaru0928/vrc-browser-chat/commit/6a9ca4d5c1fdee2906eba96355cd5be0e8aba695))
* simplify linting command in build check workflow ([44b121b](https://github.com/kanaru0928/vrc-browser-chat/commit/44b121b39943f54f48510f52a837f7e8a22e61e7))
* update eslint settings ([676b194](https://github.com/kanaru0928/vrc-browser-chat/commit/676b1946b6aae052cab2e92db3487d16a7400b8c))
* update pull request paths in build check workflow ([a16b2da](https://github.com/kanaru0928/vrc-browser-chat/commit/a16b2dab3b5f01a733e775a71acd69d9fd48df45))
* update release configuration to include git plugin for changelog and versioning ([39a36b6](https://github.com/kanaru0928/vrc-browser-chat/commit/39a36b648e9660b5d164a3ad1b30d46df3beae9d))
* update release workflow and configuration for semantic release ([45b4085](https://github.com/kanaru0928/vrc-browser-chat/commit/45b40851d77b8efcde6bd064ebf495119181b719))
* update release workflow to include new outputs and conditional checks ([e4fef23](https://github.com/kanaru0928/vrc-browser-chat/commit/e4fef231d6d51e8e6b68bc81f01dbd6cf157c963))
* update release workflow to upload build artifacts with version tagging ([03b94ff](https://github.com/kanaru0928/vrc-browser-chat/commit/03b94ff10bdc2124a1c5e8d9fc36961d50606e29))
* update release workflow trigger and permissions ([322b879](https://github.com/kanaru0928/vrc-browser-chat/commit/322b87993328856d8e14ecd21b289cfeac68374f))
* update Rust caching strategy and remove unused release notes step ([edaf869](https://github.com/kanaru0928/vrc-browser-chat/commit/edaf869830ff46072ccbab3be13d54fc127bd6d1))
* update semantic-release job to correctly output release notes and version ([4fc5bd3](https://github.com/kanaru0928/vrc-browser-chat/commit/4fc5bd381413b9ae1cb143c2af41b64a14c0a820))
* updated version number retrieval ([cbceb99](https://github.com/kanaru0928/vrc-browser-chat/commit/cbceb99fcfb31de911e63cd3397b5e16bfe86129))


### Features

* add build check workflow for CI/CD ([0757e34](https://github.com/kanaru0928/vrc-browser-chat/commit/0757e341ada8d1a1ea9d4f16b6a9bc728e9af480))
* add chat functionality with message handling and UI updates ([d8f3cab](https://github.com/kanaru0928/vrc-browser-chat/commit/d8f3cabdcbf597d323ee903c036b66b97e1a922e))
* add pnpm workspace configuration for server and web packages ([6803fbd](https://github.com/kanaru0928/vrc-browser-chat/commit/6803fbd6e2edbf441f069502689055893a655eb2))
* add release workflow with semantic-release and build steps ([546311f](https://github.com/kanaru0928/vrc-browser-chat/commit/546311f7a90965ca4f602e4033168e93763077dd))
* add server port configuration and enhance server error handling ([d80f07d](https://github.com/kanaru0928/vrc-browser-chat/commit/d80f07dce223fca8edcd77f29aa1a94cfde19bf8))
* add version display and footer to the main app layout ([77a8529](https://github.com/kanaru0928/vrc-browser-chat/commit/77a852954250f06a9f3375127250a70785564aec))
* adjusted ui around web server ([ec77439](https://github.com/kanaru0928/vrc-browser-chat/commit/ec77439b70c84e9b2907c5117ef688107ecf1deb))
* created chatbox endpoint ([74822ef](https://github.com/kanaru0928/vrc-browser-chat/commit/74822efe360ca8afcde669e51cee9bcb36374ae7))
* created status ([9968b73](https://github.com/kanaru0928/vrc-browser-chat/commit/9968b73251100592e5f0a86c4356fa66097dce2f))
* created ui ([22ae5d1](https://github.com/kanaru0928/vrc-browser-chat/commit/22ae5d1944e0b7a845720e5fe304392013aa17e2))
* created ui ([bcb8b50](https://github.com/kanaru0928/vrc-browser-chat/commit/bcb8b505b04e4a4dc895c9572cb37ac3c5eaeef1))
* enhance OSC connection handling and UI feedback ([2936da7](https://github.com/kanaru0928/vrc-browser-chat/commit/2936da772e2dcc4818f4e6aa6af792b9e5fc033a))
* implement web server start and stop commands with UI integration ([b35fe7d](https://github.com/kanaru0928/vrc-browser-chat/commit/b35fe7d62a77e63af23374287ca6e7bde564c8a8))
* implemented logic ([89226a5](https://github.com/kanaru0928/vrc-browser-chat/commit/89226a5a392dfa2cbfa7dc929fdae479f03bed7b))
* implemented update ([8c00003](https://github.com/kanaru0928/vrc-browser-chat/commit/8c0000397d87a26f82b79912dea6352ee9060948))
* initialized nextjs ([14e0aee](https://github.com/kanaru0928/vrc-browser-chat/commit/14e0aeeda9bf26f01bf9febde7ec1f9a66df119e))
* initialized shadcn ([34fdcb3](https://github.com/kanaru0928/vrc-browser-chat/commit/34fdcb3d432662e2ebd95d58fd0abdfc2533cddc))
* initialized tauri app ([4d94b53](https://github.com/kanaru0928/vrc-browser-chat/commit/4d94b53ef8408cb2ff9ceec4dd961e5a21a60a6e))
* initialized ui component of tauri ([1bf1940](https://github.com/kanaru0928/vrc-browser-chat/commit/1bf1940197dd06b92e196320bc34a819e8a82cb3))
* integrated next and tauri ([3412b7f](https://github.com/kanaru0928/vrc-browser-chat/commit/3412b7f82a4185b152ac085a724076a8c69cd2e4))
* oscを実装 ([f78cf9d](https://github.com/kanaru0928/vrc-browser-chat/commit/f78cf9dd5d74c737ef105f3cea6e6c382aa6d623))
* setup husky ([37116ef](https://github.com/kanaru0928/vrc-browser-chat/commit/37116efa4828a989ade3b83ab7afe6e535a58ffa))
