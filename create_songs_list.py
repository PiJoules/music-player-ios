#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script for creating the songs.json file from a dir of .mp3 files.
This should actually just be a shell script. Be sure to replace
this with a shell script later.
"""

from __future__ import print_function

import sys
import os
import json


def main():
    songs_dir = sys.argv[1]

    files = filter(lambda x: x.endswith(".mp3"), os.listdir(songs_dir))
    print(json.dumps(files, indent=4))

    return 0


if __name__ == "__main__":
    sys.exit(main())
