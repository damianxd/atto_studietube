<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto mod for Lærit.dk
 *
 * @package    atto_studietube
 * @copyright  2019 Damian Alarcon
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

//
// Copyright (c) 2011, Maths for More S.L. http://www.wiris.com
// This file is part of WIRIS Plugin.
//
// WIRIS Plugin is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
//
// WIRIS Plugin is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with WIRIS Plugin. If not, see <http://www.gnu.org/licenses/>.
//

defined('MOODLE_INTERNAL') || die();

/**
 * Enable studietube plugin button in the files group on installation
 *
 * @return void
 */
function xmldb_atto_studietube_install() {
    $toolbar = get_config('editor_atto', 'toolbar');
    $found = false;
    if (strpos($toolbar, 'files')) {
        $groups = explode("\n", $toolbar);
        foreach ($groups as $i => $group) {
            $parts = explode('=', $group);
            if (trim($parts[0]) == 'files') {
                $groups[$i] = 'files = studietube, ' . trim($parts[1]);
                $found = true;
            }
        }
    } else if (strpos($toolbar, 'insert')) {
        // Otherwise put it in the other group.
        foreach ($groups as $i => $group) {
            $parts = explode('=', $group);
            if (trim($parts[0]) == 'insert') {
                $groups[$i] = 'insert = studietube, ' . trim($parts[1]);
                $found = true;
            }
        }
    } else if (strpos($toolbar, 'other')) {
        // Otherwise put it in the other group.
        foreach ($groups as $i => $group) {
            $parts = explode('=', $group);
            if (trim($parts[0]) == 'other') {
                $groups[$i] = 'other = studietube, ' . trim($parts[1]);
                $found = true;
            }
        }
    }

    // Update config variable if we managed to insert the icon.
    if ($found) {
        $toolbar = implode("\n", $groups);
        set_config('toolbar', $toolbar, 'editor_atto');
    }
}